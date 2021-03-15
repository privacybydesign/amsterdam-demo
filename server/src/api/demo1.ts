import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { IDemoCredentials } from '@typedefs/index';
import { processDemoRequest } from './index';

// Credentials used in demo
const demoCredentials18: IDemoCredentials = {
    DEMO: [[['irma-demo.gemeente.personalData.over18']]],
    PRODUCTION: () => {
        const credentials = [[['pbdf.gemeente.personalData.over18']]];
        if (process.env.NODE_ENV !== 'production') {
            credentials[0].unshift(['pbdf.pilot-amsterdam.passport.over18'], ['pbdf.pilot-amsterdam.idcard.over18']);
        }
        return credentials;
    }
};

const demoCredentials65: IDemoCredentials = {
    DEMO: [[['irma-demo.gemeente.personalData.over65']]],
    PRODUCTION: () => {
        const credentials = [[['pbdf.gemeente.personalData.over65']]];
        if (process.env.NODE_ENV !== 'production') {
            credentials[0].unshift(['pbdf.pilot-amsterdam.passport.over65'], ['pbdf.pilot-amsterdam.idcard.over65']);
        }
        return credentials;
    }
};

// Define routes for demo
export default (router: Router) => {
    // 18+
    router.get('/demo1/18', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 1 - 18+`);
        return processDemoRequest(demoCredentials18, req, res, next);
    });

    // 65+
    router.get('/demo1/65', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 1 - 65+`);
        return processDemoRequest(demoCredentials65, req, res, next);
    });
};
