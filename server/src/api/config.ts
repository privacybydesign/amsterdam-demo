import { Router, Request, Response } from 'express';
import Logger from '@loaders/logger';
import { config } from '@config/index';

// Define routes for demo
export default (router: Router) => {
    router.get('/config', async (req: Request, res: Response) => {
        Logger.info(`Incoming request for config`);
        // Only expose what the frontend needs, not the internal server configuration.
        return res.status(200).json({ environment: config.environment });
    });
};
