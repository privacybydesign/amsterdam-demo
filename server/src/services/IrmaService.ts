import { Service } from 'typedi';
import { config } from '@config/index';
import { CredentialSet } from '@typedefs/index';
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

    private createSignatureRequest = (content: any, message: string) => {
        return {
            '@context': 'https://irma.app/ld/request/signature/v2',
            message: message,
            disclose: [...content]
        };
    };

    private createJWT = (authmethod: string, key: string, iss: string, irmaRequest: any) => {
        const irmaJwt = new IrmaJwt(authmethod, { secretKey: key, iss });
        const jwt = irmaJwt.signSessionRequest(irmaRequest);
        return jwt;
    };

    private requestSession = async (request: unknown): Promise<{ sessionPtr: string; token: string }> => {
        const authmethod = 'publickey';
        const jwt = this.createJWT(authmethod, process.env.PRIVATE_KEY as string, config.requestorname, request);

        Logger.info(`IrmaService.createDisclosureRequest called with request ${JSON.stringify(request)}`);

        // Return sessionPtr (QR Code) and token
        return await this.irmaBackend.startSession(jwt);
    };

    public requestDisclosureSession = async (
        credentialsToRequest: CredentialSet
    ): Promise<{ sessionPtr: string; token: string }> => {
        const request = this.createDisclosureRequest(credentialsToRequest);
        return await this.requestSession(request);
    };

    public requestSignatureSession = async (
        credentialsToRequest: CredentialSet,
        message: string
    ): Promise<{ sessionPtr: string; token: string }> => {
        const request = this.createSignatureRequest(credentialsToRequest, message);
        return await this.requestSession(request);
    };

    public requestSessionResult = async (token: string): Promise<any> => {
        try {
            Logger.info(`IrmaService.requestSessionResult called for session ${token}`);
            const result = await this.irmaBackend.getSessionResult(token);

            // Remove the IRMA and backend session if status is DONE
            if (result.status === 'DONE') {
                await this.irmaBackend.cancelSession(token);
            }

            return result;
        } catch (e) {
            // TODO: Fix error handling
            throw new Error(e);
        }
    };
}
