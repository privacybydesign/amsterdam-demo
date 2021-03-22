import Logger from '@loaders/logger';
import session, { SessionOptions } from 'express-session';
const FileStore = require('session-file-store')(session);
import { ILoaderArgs } from '.';

// Setup session management
export default ({ app, config }: ILoaderArgs) => {
    const sessionOptions: SessionOptions = {
        store: new FileStore({ ttl: 360 }),
        name: config.requestorname,
        secret: 'local secret',
        cookie: {
            httpOnly: true,
            sameSite: true
        },
        unset: 'destroy'
        // Use MemoryStore for now.
        // TODO: Enable RedisStore once there is availability in team basis to help deploy redis.
        // NOTE: Implementation for Redis integration is present in commit history
    };

    // Enable secure cookies on TLS environments
    if (process.env.NODE_ENV === 'acceptance' || process.env.NODE_ENV === 'production') {
        sessionOptions!.cookie!.secure = true;
        // TODO: Store secret outside codebase
        sessionOptions.secret = 'TODO >> Generate and store this somewhere';
    }

    app.use(session(sessionOptions));
    Logger.info('Session management initialized.');
};
