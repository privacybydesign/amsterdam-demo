import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import Logger from '@loaders/logger';
import { corsMiddleware } from '@loaders/cors';

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/result', corsMiddleware(), async (req: Request, res: Response) => {
        // The authoritative IRMA token is stored server-side on the session by
        // the disclosure/signature start handlers, so the session — not the
        // client-supplied sid — is the authority for which result may be read.
        const boundToken = (req.session as { token?: string } | undefined)?.token;
        const sid = req.query.sid as string | undefined;

        // When the client sends a sid (the disclosure demos do) it must match
        // the token bound to this session; the vote flow omits it and relies
        // solely on the session-bound token.
        if (!boundToken || (sid !== undefined && sid !== boundToken)) {
            Logger.error('Rejected result request: sid does not match the session token');
            return res.status(403).send('Forbidden');
        }

        Logger.info('Incoming request for session result');

        const irmaServiceInstance = Container.get(IrmaService);
        const result = await irmaServiceInstance.requestSessionResult(boundToken);

        // Destroy session when session is done
        if (result && result.status === 'DONE') {
            res.clearCookie(`${config.requestorname}.sid`);
        }

        return res.status(200).json(result);
    });
};
