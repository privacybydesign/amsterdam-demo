import cors, { CorsOptions } from 'cors';
import { config } from '@config/index';
import Logger from '@loaders/logger';

// Shared CORS options backed by an explicit origin allowlist (config.allowedOrigins).
//
// Requests without an Origin header (same-origin navigations, server-to-server
// calls, curl) are always allowed. Cross-origin browser requests are only
// allowed when their Origin is on the allowlist; everything else is rejected.
export const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (!origin || config.allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        Logger.warn(`Blocked CORS request from disallowed origin: ${origin}`);
        return callback(new Error('Origin not allowed by CORS'));
    }
};

// Convenience factory so route modules can register the shared, allowlisted
// CORS middleware without re-importing cors + config everywhere.
export const corsMiddleware = () => cors(corsOptions);
