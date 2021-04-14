import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from '@loaders/logger';
import { Container } from 'typedi';
import IrmaService from '@services/IrmaService';
import { CredentialSet } from 'typedefs/index';

const IRMA_CONF = {
    ELECTION_NAME: 'Best of Amsterdam Light Festival'
};

const credentialsToRequest: CredentialSet = [
    [
        [
            { type: 'irma-demo.stemmen.stempas.votingnumber' },
            {
                type: 'irma-demo.stemmen.stempas.election',
                value: IRMA_CONF.ELECTION_NAME
            }
        ]
    ]
];

export interface IQueryObj {
    [key: string]: string;
}

const processVoteRequest = async (message: string, req: Request, res: Response, next: NextFunction) => {
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

const createReadableMessage = (obj: IQueryObj): string => {
    return Object.keys(obj)
        .reduce((acc, key) => {
            return acc + key + ': ' + obj[key] + '\n';
        }, '')
        .slice(0, -1);
};

export default (router: Router) => {
    router.post('/demos/vote/start', cors(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for signing with vote-card`);
        return processVoteRequest(createReadableMessage(req.body.msg), req, res, next);
    });
};
