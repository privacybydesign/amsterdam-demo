import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { IDemoCredentials } from '@typedefs/index';
import { processDemoRequest } from './index';

// Credentials used in demo
const demoCredentials: IDemoCredentials = {
    DEMO: [
        [
            ['pbdf.pilot-amsterdam.passport.firstnames', 'pbdf.pilot-amsterdam.passport.surname'],
            ['pbdf.pilot-amsterdam.idcard.firstnames', 'pbdf.pilot-amsterdam.idcard.surname'],
            ['irma-demo.gemeente.personalData.fullname']
        ],
        [['irma-demo.sidn-pbdf.email.email']]
      ],
    PRODUCTION: [
        [
            ['pbdf.gemeente.personalData.fullname'],
            ['pbdf.pilot-amsterdam.passport.firstnames', 'pbdf.pilot-amsterdam.passport.surname'],
            ['pbdf.pilot-amsterdam.idcard.firstnames', 'pbdf.pilot-amsterdam.idcard.surname']           
        ],
        [['pbdf.sidn-pbdf.email.email']]
    ]
};

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/demo3', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 3`);
        return processDemoRequest(demoCredentials, req, res, next);
    });
};
