import { Router, Request, Response, NextFunction } from 'express';
import Logger from '@loaders/logger';
import { Container } from 'typedi';
import IrmaService from '@services/IrmaService';
import { CredentialSet } from 'typedefs/index';
import { corsMiddleware } from '@loaders/cors';

const IRMA_CONF = {
    ELECTION_NAME: 'Best of Amsterdam Light Festival'
};

// The message that ends up in the IRMA/Yivi signature request is derived from
// req.body.msg. Because that message is signed by the requestor, an unvalidated
// body turns this endpoint into a signing oracle for arbitrary text. Constrain
// it to a small allowlist of known fields with bounded-length string values
// (GHSA-5hqq-jmjf-rw22).
const ALLOWED_MSG_KEYS: string[] = (process.env.VOTE_MSG_ALLOWED_KEYS ?? 'vote')
    .split(',')
    .map(key => key.trim())
    .filter(Boolean);
const MAX_MSG_VALUE_LENGTH = 256;

// Validate the incoming msg object; returns an error string when invalid, or
// null when the message is acceptable.
export const validateVoteMessage = (msg: unknown): string | null => {
    if (typeof msg !== 'object' || msg === null || Array.isArray(msg)) {
        return 'msg must be an object';
    }

    const entries = Object.entries(msg as Record<string, unknown>);
    if (entries.length === 0) {
        return 'msg must contain at least one field';
    }

    for (const [key, value] of entries) {
        if (!ALLOWED_MSG_KEYS.includes(key)) {
            return `msg contains a disallowed field: ${key}`;
        }
        if (typeof value !== 'string') {
            return `msg field ${key} must be a string`;
        }
        if (value.length === 0 || value.length > MAX_MSG_VALUE_LENGTH) {
            return `msg field ${key} must be between 1 and ${MAX_MSG_VALUE_LENGTH} characters`;
        }
    }

    return null;
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
    router.post('/demos/vote/start', corsMiddleware(), async (req: Request, res: Response, next: NextFunction) => {
        Logger.info(`Incoming request for signing with vote-card`);

        const validationError = validateVoteMessage(req.body?.msg);
        if (validationError) {
            Logger.error(`Rejected vote request: ${validationError}`);
            return res.status(400).send(validationError);
        }

        return processVoteRequest(createReadableMessage(req.body.msg), req, res, next);
    });
};
