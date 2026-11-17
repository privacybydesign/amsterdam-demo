import { randomBytes } from 'crypto';
import Logger from '@loaders/logger';
import session, { CookieOptions, SessionOptions } from 'express-session';
const FileStore = require('session-file-store')(session);
import { ILoaderArgs } from '.';

// TLS is terminated in front of the app on these environments.
export const isTlsEnvironment = (): boolean =>
    process.env.NODE_ENV === 'acceptance' || process.env.NODE_ENV === 'production';

// Used when SESSION_KEY is not set: a key that only this process knows.
const generatedSecret = randomBytes(32).toString('hex');
if (!process.env.SESSION_KEY) {
    Logger.warn(
        'SESSION_KEY is not set: signing cookies with a random key for this process. ' +
            'Cookies stop working after a restart and are not valid on other instances.'
    );
}

// Secret used to sign the session cookie and the result-binding cookies. The
// binding cookie is the only thing that protects a result, so there is no
// well-known fallback value: without SESSION_KEY a random key is used.
export const getSessionSecret = (): string => process.env.SESSION_KEY || generatedSecret;

// Setup session management
export default ({ app, config }: ILoaderArgs) => {
    const sessionOptions: SessionOptions = {
        store: new FileStore({ ttl: 360 }),
        name: `${config.requestorname}.sid`,
        secret: getSessionSecret(),
        cookie: {
            path: '/demos',
            httpOnly: true,
            sameSite: true
        },
        unset: 'destroy',
        resave: false,
        saveUninitialized: true
        // TODO: Enable RedisStore once there is availability in team basis to help deploy redis.
        // NOTE: Implementation for Redis integration is present in commit history
    };

    // Enable secure cookies on TLS environments
    if (isTlsEnvironment()) {
        app.set('trust proxy', 1);
        (sessionOptions.cookie as CookieOptions).secure = true;
    }

    /** @ts-ignore */
    app.use(session(sessionOptions));
    Logger.info('Session management initialized.');
};
