import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { IDemoCredentials } from '@typedefs/index';
import { processDemoRequest } from './index';

// Credentials used in demo
const demoCredentials: IDemoCredentials = {
    DEMO: ['irma-demo.gemeente.personalData.fullname', 'irma-demo.sidn-pbdf.email.email'],
    PRODUCTION: [
      [
        [['pbdf.pilot-amsterdam.passport.firstnames', 'pbdf.pilot-amsterdam.passport.surname'], [['pbdf.pbdf.email.email'], ['pbdf.sidn-pbdf.email.email']]],
        [['pbdf.pilot-amsterdam.idcard.firstnames', 'pbdf.pilot-amsterdam.idcard.surname'], [['pbdf.pbdf.email.email'], ['pbdf.sidn-pbdf.email.email']]],
        [['pbdf.gemeente.personalData.fullname'], [['pbdf.pbdf.email.email'], ['pbdf.sidn-pbdf.email.email']]],
      ]
    ]
};

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/demo3', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 3`);
        return processDemoRequest(demoCredentials, req, res, next);
    });
};
