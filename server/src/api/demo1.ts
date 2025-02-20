import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { IDemoCredentials } from '@typedefs/index';
import { processDemoRequest } from './index';

// Credentials used in demo
const demoCredentials18: IDemoCredentials = {
    DEMO: [[['pbdf.pilot-amsterdam.passport.over18'], ['pbdf.pilot-amsterdam.idcard.over18'], ['irma-demo.gemeente.personalData.over18']]],
    PRODUCTION: () => [[['pbdf.pilot-amsterdam.passport.over18'], ['pbdf.pilot-amsterdam.idcard.over18'], ['pbdf.gemeente.personalData.over18']]],
};

const demoCredentials65: IDemoCredentials = {
    DEMO: [[['pbdf.pilot-amsterdam.passport.over65'], ['pbdf.pilot-amsterdam.idcard.over65'], ['irma-demo.gemeente.personalData.over65']]],
    PRODUCTION: () => [[['pbdf.pilot-amsterdam.passport.over65'], ['pbdf.pilot-amsterdam.idcard.over65'], ['pbdf.gemeente.personalData.over65']]],
};

// Define routes for demo
export default (router: Router) => {
    // 18+
    router.get('/demos/demo1/18', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 1 - 18+`);
        return processDemoRequest(demoCredentials18, req, res, next);
    });

    // 65+
    router.get('/demos/demo1/65', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 1 - 65+`);
        return processDemoRequest(demoCredentials65, req, res, next);
    });
};
