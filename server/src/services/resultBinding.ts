import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { CookieOptions, Request, Response } from 'express';
import { config } from '@config/index';
import { getSessionSecret, isTlsEnvironment } from '@loaders/session';

/**
 * Binds an IRMA session token to the browser that started the disclosure, so
 * /demos/result only serves a result to that browser.
 *
 * Every started IRMA session gets its own signed, httpOnly cookie. A single
 * "current token" slot on the server-side session is not enough here: the demo
 * pages start their IRMA session on page load, so a second tab, a second demo
 * or the two sessions of demo 1 would overwrite each other's token and the
 * earlier session could never fetch its result (#66).
 */

// Comfortably longer than an IRMA session can live (15 minutes by default),
// since the session is started on page load and may sit idle for a while.
const BINDING_MAX_AGE_MS = 30 * 60 * 1000;

const cookieName = (token: string): string =>
    `${config.requestorname}.result.${createHash('sha256').update(token).digest('hex').slice(0, 24)}`;

const sign = (token: string): string => createHmac('sha256', getSessionSecret()).update(token).digest('base64url');

export const cookieOptions = (): CookieOptions => ({
    path: '/demos',
    httpOnly: true,
    sameSite: 'strict',
    secure: isTlsEnvironment()
});

export const readCookie = (req: Request, name: string): string | undefined => {
    const header = req.headers.cookie;
    if (!header) {
        return undefined;
    }
    for (const part of header.split(';')) {
        const separator = part.indexOf('=');
        if (separator !== -1 && part.slice(0, separator).trim() === name) {
            return part.slice(separator + 1).trim();
        }
    }
    return undefined;
};

export const bindResultToken = (res: Response, token: string): void => {
    res.cookie(cookieName(token), sign(token), { ...cookieOptions(), maxAge: BINDING_MAX_AGE_MS });
};

export const isResultTokenBound = (req: Request, token: string): boolean => {
    const value = readCookie(req, cookieName(token));
    if (!value) {
        return false;
    }
    const actual = Buffer.from(value);
    const expected = Buffer.from(sign(token));
    return actual.length === expected.length && timingSafeEqual(actual, expected);
};

export const unbindResultToken = (res: Response, token: string): void => {
    res.clearCookie(cookieName(token), cookieOptions());
};
