import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import Logger from '@loaders/logger';
import { isResultTokenBound, unbindResultToken } from '@services/resultBinding';

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/result', async (req: Request, res: Response) => {
        // Results can only be read by the browser that started the flow —
        // knowing an IRMA token alone is not enough.
        //
        // Every flow sends its token as ?sid and must present the binding
        // cookie that was set for exactly that token when the session was
        // started. Binding per token (rather than one token per browser
        // session) keeps sessions started in parallel from locking each other
        // out, and does not depend on the server-side session still existing.
        const token = req.query.sid;
        if (typeof token !== 'string' || token === '' || !isResultTokenBound(req, token)) {
            Logger.error('Rejected result request: supplied sid is not bound to this browser');
            return res.status(403).send('Forbidden');
        }

        Logger.info('Incoming request for session result');

        const irmaServiceInstance = Container.get(IrmaService);
        const result = await irmaServiceInstance.requestSessionResult(token);

        // Drop the binding when the session is done
        if (result && result.status === 'DONE') {
            res.clearCookie(`${config.requestorname}.sid`);
            unbindResultToken(res, token);
        }

        return res.status(200).json(result);
    });
};
