import Logger from '@loaders/logger';
import session, { CookieOptions, SessionOptions } from 'express-session';
const FileStore = require('session-file-store')(session);
import { ILoaderArgs } from '.';

// Setup session management
export default ({ app, config }: ILoaderArgs) => {
    // The session secret must always come from the environment. Falling back to
    // a hard-coded literal ('local') meant every deployment that forgot to set
    // SESSION_KEY signed its cookies with a publicly known key, allowing session
    // forgery. Mirror the PRIVATE_KEY startup check and refuse to boot without
    // a real secret.
    if (!process.env.SESSION_KEY) {
        throw new Error('SESSION_KEY is not set!');
    }

    const sessionOptions: SessionOptions = {
        store: new FileStore({ ttl: 360 }),
        name: `${config.requestorname}.sid`,
        secret: process.env.SESSION_KEY,
        cookie: {
            path: '/demos',
            httpOnly: true,
            sameSite: true
        },
        unset: 'destroy',
        resave: false,
        // Only persist sessions that have actually been written to, so empty
        // sessions are not created (and no cookie is set) for anonymous callers.
        saveUninitialized: false
        // TODO: Enable RedisStore once there is availability in team basis to help deploy redis.
        // NOTE: Implementation for Redis integration is present in commit history
    };

    // Enable secure cookies on TLS environments
    if (process.env.NODE_ENV === 'acceptance' || process.env.NODE_ENV === 'production') {
        app.set('trust proxy', 1);
        (sessionOptions.cookie as CookieOptions).secure = true;
    }

    /** @ts-ignore */
    app.use(session(sessionOptions));
    Logger.info('Session management initialized.');
};
