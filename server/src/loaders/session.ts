import Logger from '@loaders/logger';
import session, { SessionOptions } from 'express-session';
const FileStore = require('session-file-store')(session);
import { ILoaderArgs } from '.';

// Setup session management
export default ({ app, config }: ILoaderArgs) => {
    const sessionOptions: SessionOptions = {
        store: new FileStore({ ttl: 360, path: './sessions' }),
        name: `${config.requestorname}.sid`,
        secret: 'local',
        cookie: {
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
    if (process.env.NODE_ENV === 'acceptance' || process.env.NODE_ENV === 'production') {
        app.set('trust proxy', 1);
        sessionOptions!.cookie!.secure = true;
        if (process.env.SESSION_KEY) {
            sessionOptions.secret = process.env.SESSION_KEY;
        }
    }

    app.use(session(sessionOptions));
    Logger.info('Session management initialized.');
};
