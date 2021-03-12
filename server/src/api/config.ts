import { Router, Request, Response } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { config } from '@config/index';

const getConfig = async (req: Request, res: Response) => {
    config.environment = process.env.NODE_ENV;
    res.json(config);
};

// Define routes for demo
export default (router: Router) => {
    router.get(
        '/config',
        cors(),
        async (req: Request, res: Response) => {
            Logger.info(`Incoming request for config`);
            return res.status(200).json(config);
        }
    );
};
