import { Router, Request, Response } from 'express';
import cors from 'cors';
import { Container } from 'typedi';
import IrmaService from '@services/IrmaService';
import Logger from '@loaders/logger';

// Define routes for demo
export default (router: Router) => {
    router.get('/result', cors(), async (req: Request, res: Response) => {
        Logger.info(`Incoming request for session result for session ${req.session!.token}`);
        const irmaServiceInstance = Container.get(IrmaService);
        if (req.session && req.session.token) {
            const result = await irmaServiceInstance.requestSessionResult(req.session!.token);

            // Destroy session when session is done
            if (result && result.status === 'DONE') {
                (req.session!.destroy as any)();
            }

            return res.status(200).json(result);
        } else {
            return res.status(400).send('No session was found for this request.');
        }
    });
};
