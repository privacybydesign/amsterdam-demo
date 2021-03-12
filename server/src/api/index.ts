import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { CredentialSet, CredentialSetFunction, IDemoCredentials } from 'types';
import logger from '@loaders/logger';
import IrmaService from '@services/IrmaService';
import demo1 from './demo1';
import demo2 from './demo2';
import demo3 from './demo3';

export default () => {
    const router = Router();
    demo1(router);
    demo2(router);
    demo3(router);
    return router;
};

export const selectCredentialsToRequest = (
    req: Request,
    credentialsToRequest: IDemoCredentials,
    ...args: undefined[]
): CredentialSet => {
    let credentialSetOrFunction: CredentialSet | CredentialSetFunction;
    if (req.query.demo === 'true' && process.env.NODE_ENV !== 'production') {
        credentialSetOrFunction = credentialsToRequest.DEMO;
    } else {
        credentialSetOrFunction = credentialsToRequest.PRODUCTION;
    }

    if (typeof credentialSetOrFunction !== 'function') {
        return credentialSetOrFunction;
    } else {
        return credentialSetOrFunction(...args);
    }
};

export const processDemoRequest = async (demoCredentials: IDemoCredentials, req: Request, res: Response, next: NextFunction, ...args: undefined[]) => {
    try {
        const irmaServiceInstance = Container.get(IrmaService);
        const credentialsToRequest = selectCredentialsToRequest(req, demoCredentials, ...args);
        const { token, sessionPtr } = await irmaServiceInstance.requestDisclosureSession(credentialsToRequest);

        // Store token in session
        req.session!.token = token;

        // Return QR Code
        return res.status(200).json(sessionPtr);

    } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
    }
};
