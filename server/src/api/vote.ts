import { Router, Request, Response, NextFunction } from 'express';
import Logger from '@loaders/logger';
import { Container } from 'typedi';
import IrmaService from '@services/IrmaService';
import { CredentialSet } from 'typedefs/index';
import { bindResultToken } from '@services/resultBinding';

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

// Limits for the object that is turned into the message the user signs.
const MAX_MESSAGE_ENTRIES = 20;
const MAX_KEY_LENGTH = 64;
const MAX_VALUE_LENGTH = 512;
// Control characters (line breaks in particular) would let a value add or
// alter lines of the signed message.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/;

export const isValidMessageObject = (msg: unknown): msg is IQueryObj => {
    if (typeof msg !== 'object' || msg === null || Array.isArray(msg)) {
        return false;
    }
    const entries = Object.entries(msg);
    return (
        entries.length <= MAX_MESSAGE_ENTRIES &&
        entries.every(
            ([key, value]) =>
                key.length > 0 &&
                key.length <= MAX_KEY_LENGTH &&
                !CONTROL_CHARACTERS.test(key) &&
                typeof value === 'string' &&
                value.length <= MAX_VALUE_LENGTH &&
                !CONTROL_CHARACTERS.test(value)
        )
    );
};

const processVoteRequest = async (message: string, req: Request, res: Response, next: NextFunction) => {
    try {
        const irmaServiceInstance = Container.get(IrmaService);

        const { token, sessionPtr } = await irmaServiceInstance.requestSignatureSession(credentialsToRequest, message);

        // Bind the token to this browser so /demos/result can verify the
        // caller is the one who started the session (see result.ts).
        bindResultToken(res, token);

        // Return QR Code and the session id to request the result with
        const sessionId = encodeURIComponent(token);
        return res.status(200).json({ sessionPtr, sessionId });
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
    // The token the frontend must send in the x-csrf-token header when it
    // starts a vote session. It is created by the CSRF middleware on /demos
    // and belongs to the CSRF cookie of this browser.
    router.get('/demos/vote/csrf-token', (req: Request, res: Response) => {
        res.set('Cache-Control', 'no-store');
        return res.status(200).json({ csrfToken: res.locals._csrf });
    });

    router.post('/demos/vote/start', async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for signing with vote-card`);
        const msg: unknown = req.body?.msg;
        if (!isValidMessageObject(msg)) {
            Logger.error('Rejected vote request: invalid message');
            return res.status(400).send('Bad Request');
        }
        return processVoteRequest(createReadableMessage(msg), req, res, next);
    });
};
