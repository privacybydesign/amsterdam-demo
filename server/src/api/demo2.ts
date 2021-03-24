import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { IDemoCredentials } from '@typedefs/index';
import { processDemoRequest } from './index';

// Credentials used in demo
const demoCredentials: IDemoCredentials = {
    DEMO: [[['irma-demo.RU.idinData.zipcode', 'irma-demo.gemeente.personalData.over18']]],
    PRODUCTION: [[['pbdf.gemeente.address.zipcode', 'pbdf.gemeente.personalData.over18']]]
};

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/demo2', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 2`);
        return processDemoRequest(demoCredentials, req, res, next);
    });
};
