import { Router, Request, Response } from 'express';
import cors from 'cors';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import Logger from '@loaders/logger';

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/result', cors(), async (req: Request, res: Response) => {
        let sessionToken = (req.session! as any).token;

        // If the session was not found because of missing cookie header, try and find it ourselves with the query param (ios 10 fix)
        if (!sessionToken) {
            sessionToken = await (() =>
                new Promise((resolve, reject) => {
                    (req as any).sessionStore.get(req.query.sid, (error: any, session: any) => {
                        if (session && session.token) {
                            resolve(session.token);
                        } else {
                            reject(error);
                        }
                    });
                }))();
        }

        Logger.info(`Incoming request for session result for session ${sessionToken}`);

        const irmaServiceInstance = Container.get(IrmaService);
        if (sessionToken) {
            const result = await irmaServiceInstance.requestSessionResult(sessionToken);

            // Destroy session when session is done
            if (result && result.status === 'DONE') {
                (req.session!.destroy as any)();
                res.clearCookie(`${config.requestorname}.sid`);
            }

            return res.status(200).json(result);
        } else {
            const errMessage = `No session was found for request ${sessionToken}`;
            Logger.error(errMessage);
            return res.status(400).send(errMessage);
        }
    });
};
