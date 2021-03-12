import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import logger from '@loaders/logger';
import { IDemoCredentials } from 'types/index';
import { processDemoRequest } from './index';

// Credentials used in demo
const demoCredentials: IDemoCredentials = {
    DEMO: [[['irma-demo.RU.idinData.zipcode', 'irma-demo.gemeente.personalData.over18']]],
    PRODUCTION: [[['pbdf.gemeente.address.zipcode', 'pbdf.gemeente.personalData.over18']]],
};

// Define routes for demo 2
export default (router: Router) => {
    router.get(
        '/demo2',
        cors(),
        async (req: Request, res: Response, next: NextFunction) => {
            logger.info(`Incoming request for demo 2`);
            return processDemoRequest(demoCredentials, req, res, next);
        }
    );
};
