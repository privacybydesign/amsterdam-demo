import { Request } from 'express';
import { Service } from 'typedi';
import { config } from '@config/index';
import { CredentialSet, IDemoCredentials } from 'types';
import Logger from '@loaders/logger';

// Load IRMA libraries
const IrmaBackend = require('@privacybydesign/irma-backend');
const IrmaJwt = require('@privacybydesign/irma-jwt');

// IRMA Service
@Service()
export default class {
    private irmaBackend = new IrmaBackend(config.irma, {
        debugging: true
    });

    private createDisclosureRequest = (content: any) => {
        return {
            '@context': 'https://irma.app/ld/request/disclosure/v2',
            disclose: [...content]
        };
    };

    private createJWT = (authmethod: string, key: string, iss: string, irmaRequest: any) => {
        const irmaJwt = new IrmaJwt(authmethod, { secretKey: key, iss });
        const jwt = irmaJwt.signSessionRequest(irmaRequest);
        return jwt;
    };

    public requestDisclosureSession = async (
        credentialsToRequest: CredentialSet
    ): Promise<{ sessionPtr: string; token: string }> => {
        const authmethod = 'publickey';
        const request = this.createDisclosureRequest(credentialsToRequest);
        const jwt = this.createJWT(authmethod, process.env.PRIVATE_KEY as string, config.requestorname, request);

        Logger.info(`IrmaService.createDisclosureRequest called: ${JSON.stringify(request)}`);

        // Return sessionPtr (QR Code) and token
        return await this.irmaBackend.startSession(jwt);
    };
}
