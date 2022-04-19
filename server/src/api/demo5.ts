import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { IDemoCredentials } from '@typedefs/index';
import { processDemoRequest } from './index';

// Credentials used in demo
const demoCredentials: IDemoCredentials = {
    DEMO: ({ mobileNumber, email }: { mobileNumber: boolean; email: boolean }) => {
        const credentials = [];
        if (mobileNumber === true) {
            credentials.push([['irma-demo.pbdf.mobilenumber.mobilenumber']]);
        }

        if (email === true) {
            credentials.push([['irma-demo.sidn-pbdf.email.email']]);
        }
        return credentials;
    },
    PRODUCTION: ({ mobileNumber, email }: { mobileNumber: boolean; email: boolean }) => {
        const credentials = [];
        if (mobileNumber === true) {
            credentials.push([['pbdf.pbdf.mobilenumber.mobilenumber'], ['pbdf.sidn-pbdf.mobilenumber.mobilenumber']]);
        }

        if (email === true) {
            credentials.push([['pbdf.pbdf.email.email'], ['pbdf.sidn-pbdf.email.email']]);
        }
        return credentials;
    }
};

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/demo5', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 5`);
        const mobileNumber: boolean = req.query.phone === 'true';
        const email: boolean = req.query.email === 'true';
        return processDemoRequest(demoCredentials, req, res, next, { mobileNumber, email });
    });
};
