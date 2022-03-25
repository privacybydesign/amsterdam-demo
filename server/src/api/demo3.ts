import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { IDemoCredentials } from '@typedefs/index';
import { processDemoRequest } from './index';

// Credentials used in demo
const demoCredentials: IDemoCredentials = {
    DEMO: [[['irma-demo.gemeente.personalData.fullname', 'irma-demo.gemeente.personalData.bsn']]],
    PRODUCTION: [[['pbdf.gemeente.personalData.fullname', 'pbdf.gemeente.personalData.bsn']]]
};

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/demo3', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 3`);
        return processDemoRequest(demoCredentials, req, res, next);
    });
};
