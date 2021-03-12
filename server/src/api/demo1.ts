import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import logger from '@loaders/logger';
import { CredentialSetFunction, IDemoCredentials } from 'types/index';
import IrmaService from '@services/IrmaService';
import { selectCredentialsToRequest } from './index';

// Credentials used in demo
const demoCredentials: IDemoCredentials = {
    DEMO: {
        DEMO1_18: () => [[['irma-demo.gemeente.personalData.over18']]],
        DEMO1_65: () => [[['irma-demo.gemeente.personalData.over65']]]
    },
    PRODUCTION: {
        DEMO1_18: () => {
            const credentials = [[['pbdf.gemeente.personalData.over18']]];
            if (process.env.NODE_ENV !== 'production') {
                credentials[0].unshift(
                    ['pbdf.pilot-amsterdam.passport.over18'],
                    ['pbdf.pilot-amsterdam.idcard.over18']
                );
            }
            return credentials;
        },
        DEMO1_65: () => {
            const credentials = [[['pbdf.gemeente.personalData.over65']]];
            if (process.env.NODE_ENV !== 'production') {
                credentials[0].unshift(
                    ['pbdf.pilot-amsterdam.passport.over65'],
                    ['pbdf.pilot-amsterdam.idcard.over65']
                );
            }
            return credentials;
        }
    }
};

const processDemoRequest = async (age: string, req: Request, res: Response, next: NextFunction) => {
    logger.info(`Incoming request for demo 1, ${age}+`);
    try {
        const irmaServiceInstance = Container.get(IrmaService);
        const credentialsToRequest = selectCredentialsToRequest(req, demoCredentials, `DEMO1_${age}`);
        const { token, sessionPtr } = await irmaServiceInstance.requestDisclosureSession(credentialsToRequest);
        // Store token in session
        console.log(req.session);
        req.session!.token = token;
        return res.status(200).json(sessionPtr);
    } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
    }
};

// Define routes for demo
export default (router: Router) => {
    // Demo 1 - 18+
    router.get(
        '/demo1/18',
        cors(),
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
            })
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            return processDemoRequest('18', req, res, next);
        }
    );

    // Demo 1 - 65+
    router.get(
        '/demo1/65',
        cors(),
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
            })
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            return processDemoRequest('65', req, res, next);
        }
    );
};
