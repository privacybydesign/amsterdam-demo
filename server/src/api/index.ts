import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { CredentialSet, CredentialSetFunction, IDemoCredentials } from 'types';
import Logger from '@loaders/logger';
import IrmaService from '@services/IrmaService';
import demo1 from './demo1';
import demo2 from './demo2';
import demo3 from './demo3';
import demo4 from './demo4';
import demo5 from './demo5';

export default () => {
    const router = Router();
    demo1(router);
    demo2(router);
    demo3(router);
    demo4(router);
    demo5(router);
    return router;
};

export const selectCredentialsToRequest = (
    req: Request,
    credentialsToRequest: IDemoCredentials,
    ...args: any[]
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

export const processDemoRequest = async (demoCredentials: IDemoCredentials, req: Request, res: Response, next: NextFunction, ...args: any[]) => {
    try {
        const irmaServiceInstance = Container.get(IrmaService);
        const credentialsToRequest = selectCredentialsToRequest(req, demoCredentials, ...args);
        const { token, sessionPtr } = await irmaServiceInstance.requestDisclosureSession(credentialsToRequest);

        // Store token in session
        req.session!.token = token;

        // Return QR Code
        return res.status(200).json(sessionPtr);

    } catch (e) {
        Logger.error('🔥 error: %o', e);
        return next(e);
    }
};
