import e, { Router, Request } from 'express';
import { CredentialSet, CredentialSetFunction, IDemoCredentials } from 'types';
import demo from './demo1';

export default () => {
    const router = Router();
    demo(router);
    return router;
};

export const selectCredentialsToRequest = (
    req: Request,
    credentialsToRequest: IDemoCredentials,
    demoKey: string,
    ...args: undefined[]
): CredentialSet => {
    let credentialSetOrFunction: CredentialSet | CredentialSetFunction;
    if (req.query.demo === 'true' && process.env.NODE_ENV !== 'production') {
        credentialSetOrFunction = credentialsToRequest.DEMO[demoKey];
    } else {
        credentialSetOrFunction = credentialsToRequest.PRODUCTION[demoKey];
    }

    if (typeof credentialSetOrFunction !== 'function') {
        return credentialSetOrFunction;
    } else {
        return credentialSetOrFunction(...args);
    }
};
