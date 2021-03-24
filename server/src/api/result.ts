import { Router, Request, Response } from 'express';
import cors from 'cors';
import { Container } from 'typedi';
import { readdir } from 'fs/promises';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import Logger from '@loaders/logger';

// Define routes for demo
export default (router: Router) => {
    router.get('/demos/result', cors(), async (req: Request, res: Response) => {
        const sessionToken = (req.session! as any).token;
        Logger.info(`Incoming request for session result for session ${sessionToken}`);

        console.log('TRY TO READ');
        try {
            const files = await readdir('sessions');
            console.log('DIR IS READ');
            for await (const file of files) console.log(file);
        } catch (err) {
            console.error(err);
        }

        const irmaServiceInstance = Container.get(IrmaService);
        if (req.session && sessionToken) {
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
