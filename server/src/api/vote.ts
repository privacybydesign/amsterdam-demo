import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { Container } from 'typedi';
import IrmaService from '@services/IrmaService';
import { CredentialSet } from 'typedefs/index';

const credentialsToRequest: CredentialSet = [
    [
        [
            { type: 'irma-demo.stemmen.stempas.votingnumber', value: null },
            {
                type: 'irma-demo.stemmen.stempas.election',
                value: 'test'
            }
        ]
    ]
];

export const processVoteRequest = async (message: string, req: Request, res: Response, next: NextFunction) => {
    try {
        const irmaServiceInstance = Container.get(IrmaService);

        const { token, sessionPtr } = await irmaServiceInstance.requestSignatureSession(credentialsToRequest, message);

        // Store token in session
        (req.session as any)!.token = token;

        // Return QR Code
        return res.status(200).json(sessionPtr);
    } catch (e) {
        Logger.error('🔥 error: %o', e);
        return next(e);
    }
};

export default (router: Router) => {
    router.post('/demos/vote/start', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for signing with vote-card`);
        return processVoteRequest(JSON.stringify(req.body.msg), req, res, next);
    });
};
