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



// MOVE TO BUSINESS LOGIC OF DEMO's
const CREDENTIALS_TO_REQUEST = {
    DEMO: {
        DEMO4: [
            [
                [
                    'irma-demo.gemeente.personalData.fullname',
                    'irma-demo.gemeente.address.street',
                    'irma-demo.gemeente.address.houseNumber',
                    'irma-demo.gemeente.address.zipcode',
                    'irma-demo.gemeente.address.city'
                ]
            ],
            [['irma-demo.pbdf.mobilenumber.mobilenumber']],
            [['irma-demo.sidn-pbdf.email.email']]
        ],
        DEMO5: (mobileNumber: boolean, email: boolean) => {
            const credentials = [];
            if (mobileNumber === true) {
                credentials.push([['irma-demo.pbdf.mobilenumber.mobilenumber']]);
            }

            if (email === true) {
                credentials.push([['irma-demo.sidn-pbdf.email.email']]);
            }
            return credentials;
        }
    },
    PRODUCTION: {
        DEMO4: [
            [
                [
                    'pbdf.gemeente.personalData.fullname',
                    'pbdf.gemeente.address.street',
                    'pbdf.gemeente.address.houseNumber',
                    'pbdf.gemeente.address.zipcode',
                    'pbdf.gemeente.address.city'
                ]
            ],
            [['pbdf.pbdf.mobilenumber.mobilenumber']],
            [['pbdf.pbdf.email.email'], ['pbdf.sidn-pbdf.email.email']]
        ],
        DEMO5: (mobileNumber: boolean, email: boolean) => {
            const credentials = [];
            if (mobileNumber === true) {
                credentials.push([['pbdf.pbdf.mobilenumber.mobilenumber']]);
            }

            if (email === true) {
                credentials.push([['pbdf.pbdf.email.email'], ['pbdf.sidn-pbdf.email.email']]);
            }
            return credentials;
        }
    }
};


// MOVE ROUTES
app.get('/getsession/demo4', cors(), irmaDiscloseDemo4);
app.get('/getsession/demo5', cors(), irmaDiscloseDemo5);
app.get('/config', cors(), getConfig);
app.get('/result', cors(), getIrmaSessionResult);

/// MOVE THESE

async function irmaDiscloseDemo4(req: Request, res: Response) {
    return irmaDiscloseRequest(req, res, getCredentialSourceFromRequest(req).DEMO4);
}

async function irmaDiscloseDemo5(req: Request, res: Response) {
    const askPhone: boolean = req.query.phone === 'true';
    const askEmail: boolean = req.query.email === 'true';
    return irmaDiscloseRequest(req, res, getCredentialSourceFromRequest(req).DEMO5(askPhone, askEmail));
}

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

const error = (e: Error, res: Response) => {
    if (res) {
        res.json({ error: e });
    }
};

init();

*/
