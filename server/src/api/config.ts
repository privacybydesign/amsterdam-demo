import { Router, Request, Response } from 'express';
import Logger from '@loaders/logger';
import { config } from '@config/index';
import { corsMiddleware } from '@loaders/cors';

// Define routes for demo
export default (router: Router) => {
    router.get('/config', corsMiddleware(), async (req: Request, res: Response) => {
        Logger.info(`Incoming request for config`);
        // Return only what the (unauthenticated) client actually needs. The
        // full IConfig exposes internal deployment details — most importantly
        // the internal IRMA server URL — which must not leak to the browser
        // (GHSA-5hqq-jmjf-rw22).
        return res.status(200).json({ environment: config.environment });
    });
};
