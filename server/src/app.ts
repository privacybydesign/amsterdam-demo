import 'reflect-metadata';
import express from 'express';
import { config } from '@config/index';
import Logger from '@loaders/logger';

async function init() {
    const app = express();

    await require('./loaders').default({ app, config });

    app.listen(config.port, () => {
        Logger.info(`🛡️ Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${config.port}.`);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });
}

init();

/*



// MOVE ROUTES
app.get('/config', cors(), getConfig);
app.get('/result', cors(), getIrmaSessionResult);

/// MOVE THESE

const getConfig = async (req: Request, res: Response) => {
    config.environment = process.env.NODE_ENV;
    res.json(config);
};

const getIrmaSessionResult = async (req: Request, res: Response) => {
    try {
        const result = await irmaBackend.getSessionResult(req.session!.token);

        // Remove the IRMA and backend session if status is DONE
        if (result.status === 'DONE') {
            await irmaBackend.cancelSession(req.session!.token);
            (req.session!.destroy as any)();
        }

        res.json(result);
    } catch (e) {
        console.log('irma.getSessionResuilt error:', JSON.stringify(e));
        error(e, res);
    }
};

*/
