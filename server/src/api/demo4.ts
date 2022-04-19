import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { IDemoCredentials } from '@typedefs/index';
import { processDemoRequest } from './index';

// Credentials used in demo
const demoCredentials: IDemoCredentials = {
    DEMO: [
        [
            [
                'irma-demo.gemeente.personalData.fullname',
                'irma-demo.gemeente.address.street',
                'irma-demo.gemeente.address.houseNumber',
                'irma-demo.gemeente.address.zipcode',
                'irma-demo.gemeente.address.city'
            ]
        ],
        [['irma-demo.pbdf.mobilenumber.mobilenumber']],
        [['irma-demo.sidn-pbdf.email.email']]
    ],
    PRODUCTION: [
        [
            [
                'pbdf.gemeente.personalData.fullname',
                'pbdf.gemeente.address.street',
                'pbdf.gemeente.address.houseNumber',
                'pbdf.gemeente.address.zipcode',
                'pbdf.gemeente.address.city'
            ]
        ],
        [['pbdf.pbdf.mobilenumber.mobilenumber'], ['pbdf.sidn-pbdf.mobilenumber.mobilenumber']],
        [['pbdf.pbdf.email.email'], ['pbdf.sidn-pbdf.email.email']]
    ]
};

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/demo4', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for demo 4`);
        return processDemoRequest(demoCredentials, req, res, next);
    });
};
