import { Router, Request, Response } from 'express';
import Logger from '@loaders/logger';
import { config } from '@config/index';
import { corsMiddleware } from '@loaders/cors';

// Define routes for demo
export default (router: Router) => {
    router.get('/config', corsMiddleware(), async (req: Request, res: Response) => {
        Logger.info(`Incoming request for config`);
        // This endpoint is unauthenticated, so it returns only the fields the
        // client actually needs rather than the full IConfig.
        return res.status(200).json({ environment: config.environment });
    });
};
