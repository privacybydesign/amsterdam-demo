import { randomBytes } from 'crypto';
import Logger from '@loaders/logger';
import session, { SessionOptions } from 'express-session';
import lusca from 'lusca';
import rateLimit from 'express-rate-limit';
import { csrfTokens } from '@services/csrf';
const FileStore = require('session-file-store')(session);
import { ILoaderArgs } from '.';

// TLS is terminated in front of the app on these environments.
export const isTlsEnvironment = (): boolean =>
    process.env.NODE_ENV === 'acceptance' || process.env.NODE_ENV === 'production';

// Header in which the frontend sends the CSRF token for state-changing requests.
export const CSRF_HEADER = 'x-csrf-token';

let generatedSecret: string | undefined;

// Secret used to sign the session cookie and the result-binding cookies.
// SESSION_KEY is required on deployed environments. Without it (local
// development, tests) a random secret is generated for this process, so there
// is no well-known value that could be used to forge cookies.
export const getSessionSecret = (): string => {
    if (process.env.SESSION_KEY) {
        return process.env.SESSION_KEY;
    }
    if (isTlsEnvironment()) {
        throw new Error('SESSION_KEY is not set!');
    }
    if (!generatedSecret) {
        generatedSecret = randomBytes(32).toString('hex');
    }
    return generatedSecret;
};

// Setup session management
export default ({ app, config }: ILoaderArgs) => {
    const sessionOptions: SessionOptions = {
        store: new FileStore({ ttl: 360 }),
        name: `${config.requestorname}.sid`,
        secret: getSessionSecret(),
        cookie: {
            path: '/demos',
            httpOnly: true,
            sameSite: 'strict',
            // Secure cookies on TLS environments
            secure: isTlsEnvironment()
        },
        unset: 'destroy',
        resave: false,
        saveUninitialized: false
        // TODO: Enable RedisStore once there is availability in team basis to help deploy redis.
        // NOTE: Implementation for Redis integration is present in commit history
    };

    // The cookies are only sent for /demos, so the session, the stricter rate
    // limit and the CSRF protection are scoped to those routes. Everything
    // under /demos starts an IRMA session or reads its result.
    app.use('/demos', rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false }));
    app.use('/demos', session(sessionOptions));
    // State-changing requests must carry the CSRF token of this browser in the
    // CSRF_HEADER header (see services/csrf.ts and /demos/vote/csrf-token).
    app.use('/demos', lusca.csrf({ header: CSRF_HEADER, impl: csrfTokens }));
    Logger.info('Session management initialized.');
};
