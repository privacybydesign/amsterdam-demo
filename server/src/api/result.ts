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
        // the disclosure/signature start handlers. Deriving the token from the
        // session (rather than trusting the client-supplied sid) means results
        // can only be read by the same browser session that started the flow —
        // knowing a token alone is no longer enough (GHSA-5hqq-jmjf-rw22).
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
