import Logger from '@loaders/logger';
import session, { CookieOptions, SessionOptions } from 'express-session';
const FileStore = require('session-file-store')(session);
import { ILoaderArgs } from '.';

// TLS is terminated in front of the app on these environments.
export const isTlsEnvironment = (): boolean =>
    process.env.NODE_ENV === 'acceptance' || process.env.NODE_ENV === 'production';

// Secret used to sign the session cookie and the result-binding cookies.
export const getSessionSecret = (): string =>
    isTlsEnvironment() && process.env.SESSION_KEY ? process.env.SESSION_KEY : 'local';

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
