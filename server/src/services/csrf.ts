import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { Request } from 'express';
import { config } from '@config/index';
import { getSessionSecret } from '@loaders/session';
import { cookieOptions, readCookie } from '@services/resultBinding';

/**
 * CSRF tokens for the lusca CSRF middleware, using the signed double-submit
 * cookie pattern instead of lusca's default of a secret on the server-side
 * session.
 *
 * The browser gets a random id in an httpOnly, SameSite=Strict cookie. The
 * token it must send back in a request header is an HMAC of that id. Another
 * site cannot read the cookie or the token, and a token obtained in another
 * browser does not match the victim's cookie. Nothing is stored on the server,
 * so every replica that shares SESSION_KEY accepts the token.
 */

const cookieName = (): string => `${config.requestorname}.csrf`;

const ID_FORMAT = /^[A-Za-z0-9_-]{43}$/;

const tokenFor = (id: string): string =>
    createHmac('sha256', getSessionSecret()).update(`csrf:${id}`).digest('base64url');

type RequestWithCsrfId = Request & { csrfId?: string };

const getId = (req: RequestWithCsrfId): string => {
    if (!req.csrfId) {
        const existing = readCookie(req, cookieName());
        if (existing && ID_FORMAT.test(existing)) {
            req.csrfId = existing;
        } else {
            req.csrfId = randomBytes(32).toString('base64url');
            req.res?.cookie(cookieName(), req.csrfId, cookieOptions());
        }
    }
    return req.csrfId;
};

export const csrfTokens = {
    create: (req: Request) => {
        const secret = getId(req);
        const token = tokenFor(secret);
        const validate = (_req: Request, candidate: unknown): boolean => {
            if (typeof candidate !== 'string') {
                return false;
            }
            const actual = Buffer.from(candidate);
            const expected = Buffer.from(token);
            return actual.length === expected.length && timingSafeEqual(actual, expected);
        };
        return { secret, token, validate };
    }
};
