const express = require('express');
const session = require('express-session');
const IrmaBackend = require('@privacybydesign/irma-backend');
const IrmaJwt = require('@privacybydesign/irma-jwt');
const cors = require('cors');
const util = require('util');
const fs = require('fs');
const path = require('path');
const proxy = require('http-proxy-middleware');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

// global configuration variable.
let config;
let irmaBackend;

const CREDENTIALS_TO_REQUEST = {
    DEMO: {
        DEMO1_18: () => [[['irma-demo.gemeente.personalData.over18']]],
        DEMO1_65: () => [[['irma-demo.gemeente.personalData.over65']]],
        DEMO2: [[['irma-demo.RU.idinData.zipcode', 'irma-demo.gemeente.personalData.over18']]],
        DEMO3: [[['irma-demo.gemeente.personalData.fullname', 'irma-demo.gemeente.personalData.bsn']]],
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
        DEMO5: (mobileNumber = true, email = true) => {
            const credentials = [];
            if (mobileNumber === 'true') {
                credentials.push([['irma-demo.pbdf.mobilenumber.mobilenumber']]);
            }

            if (email === 'true') {
                credentials.push([['irma-demo.sidn-pbdf.email.email']]);
            }
            return credentials;
        }
    },
    PRODUCTION: {
        DEMO1_18: () => {
            const credentials = [[['pbdf.gemeente.personalData.over18']]];
            if (process.env.NODE_ENV !== 'production') {
                credentials[0].unshift(
                    ['pbdf.pilot-amsterdam.passport.over18'],
                    ['pbdf.pilot-amsterdam.idcard.over18']
                );
            }
            return credentials;
        },
        DEMO1_65: () => {
            const credentials = [[['pbdf.gemeente.personalData.over65']]];
            if (process.env.NODE_ENV !== 'production') {
                credentials[0].unshift(
                    ['pbdf.pilot-amsterdam.passport.over65'],
                    ['pbdf.pilot-amsterdam.idcard.over65']
                );
            }
            return credentials;
        },
        DEMO2: [[['pbdf.gemeente.address.zipcode', 'pbdf.gemeente.personalData.over18']]],
        DEMO3: [[['pbdf.gemeente.personalData.fullname', 'pbdf.gemeente.personalData.bsn']]],
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
        DEMO5: (mobileNumber = 'true', email = 'true') => {
            const credentials = [];
            if (mobileNumber === 'true') {
                credentials.push([['pbdf.pbdf.mobilenumber.mobilenumber']]);
            }

            if (email === 'true') {
                credentials.push([['pbdf.pbdf.email.email'], ['pbdf.sidn-pbdf.email.email']]);
            }
            return credentials;
        }
    }
};

/**
 * Use this call to check the request:
 * `curl -H 'Content-Type: application/json' -H 'X-IRMA-MinProtocolVersion: '2.4'' -H 'X-IRMA-MaxProtocolVersion: '2.5'' https://acc.attr.auth.amsterdam.nl/irma/session/zhvALcNoCbCyU0MMZNz5`
 * `curl -H 'Content-Type: application/json' -H 'X-IRMA-MinProtocolVersion: '2.4'' -H 'X-IRMA-MaxProtocolVersion: '2.5'' http://localhost:8088/irma/session/WJGQXzbdepNfUg1dc3nT`
 *
 * The result should look like `{'@context':'https://irma.app/ld/request/disclosure/v2','context':'AQ==','nonce':'VItsL+3+GiBHyIt1hIRwSQ==','protocolVersion':'2.5','disclose':[[['pbdf.sidn-pbdf.irma.pseudonym']]]}`
 */

const createIrmaRequest = content => {
    return {
        '@context': 'https://irma.app/ld/request/disclosure/v2',
        disclose: [...content]
    };
};

// Setup authentication for acceptance
const secured = function (req, res, next) {
    if (process.env.NODE_ENV !== 'acceptance') {
        return next();
    }

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).sendFile(path.join(__dirname, '/pages/403.html'));
    }

    // check the entered credentials
    const credentials = Buffer.from('irma:demo').toString('base64');
    if (req.headers.authorization !== `Basic ${credentials}`) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.sendFile(path.join(__dirname, '/pages/403.html'));
    }

    next();
};

const setConfig = async () => {
    let configFile = 'config.json';
    if (process.env.NODE_ENV === 'production') {
        configFile = 'config.prod.json';
    }
    const json = await util.promisify(fs.readFile)(configFile, 'utf-8');
    console.log('Using config', json);
    config = JSON.parse(json);
    initializeIrmaBackend(config.irma);
};

const initializeIrmaBackend = irmaServerUrl => {
    irmaBackend = new IrmaBackend(irmaServerUrl, {
        debugging: true
    });
};

const app = express();

// Initialize redis for session management
let redisClient;
try {
    redisClient = redis.createClient(process.env.REDIS_URL);
}  catch (e) {
    console.log('Error connecting to redis', e);
    error(e);
}

const init = async () => {
    if (!process.env.PRIVATE_KEY) {
        throw new Error('PRIVATE_KEY is not set');
    }

    try {
        // read the config file only once each session
        if (config === undefined) {
            await setConfig();
        }

        app.use(express.json());

        // Cookie setup
        const sessionOptions = {
            name: 'irma-demo',
            secret: 'local secret',
            cookie: {
                httpOnly: true,
                sameSite: true,
                // Enable the cookie to remain for only the duration of the user-agent
                expires: false
            },
            unset: 'destroy',
            store: new RedisStore({ client: redisClient })
        };
        
        // Enable secure cookies on TLS environments
        if (process.env.NODE_ENV === 'acceptance' || process.env.NODE_ENV === 'production') {
            sessionOptions.cookie.secure = true;
            // TODO: Store secret outside codebase
            sessionOptions.secret = 'TODO >> Generate and store this somewhere';
        }

        app.use(
            session(sessionOptions)
        );
  

        // Note: To use the demo credentials on non-production environments add ?demo=true to the URL
        app.get('/getsession/demo1/18', cors(), irmaDiscloseDemo1_18);
        app.get('/getsession/demo1/65', cors(), irmaDiscloseDemo1_65);
        app.get('/getsession/demo2', cors(), irmaDiscloseDemo2);
        app.get('/getsession/demo3', cors(), irmaDiscloseDemo3);
        app.get('/getsession/demo4', cors(), irmaDiscloseDemo4);
        app.get('/getsession/demo5', cors(), irmaDiscloseDemo5);
        app.get('/config', cors(), getConfig);
        app.get('/health', cors(), health);
        app.get('/result', cors(), getIrmaSessionResult);

        if (process.env.NODE_ENV === 'acceptance' || process.env.NODE_ENV === 'production') {
            app.use(express.static(config.docroot, { index: false }));
            app.get('*', secured, function (req, res) {
                res.sendFile(path.join(__dirname, config.docroot, 'index.html'));
            });
        } else {
            console.log('Using proxy to the react app for development');
            // proxy the root to the react app container in development mode
            app.use(
                '/',
                proxy({
                    target: process.env.FE_URL,
                    changeOrigin: true
                })
            );
        }

        app.listen(config.port, () =>
            console.log(`Di-demo backend running in ${process.env.NODE_ENV || 'development'} mode.`)
        );

        if (process.env.NODE_ENV === 'acceptance' || process.env.NODE_ENV === 'production') {
            console.log('Authentication is enabled!');
        }
    } catch (e) {
        console.log(e);
        error(e);
    }
};

const health = async (req, res) => {
    return res.status(200).send('Healthy!');
};

const createJWT = (authmethod, key, iss, irmaRequest) => {
    const irmaJwt = new IrmaJwt(authmethod, { secretKey: key, iss });
    const jwt = irmaJwt.signSessionRequest(irmaRequest);
    return jwt;
};

const irmaDiscloseRequest = async (req, res, requestType, id) => {
    const authmethod = 'publickey';
    const request = createIrmaRequest(requestType);
    const jwt = createJWT(authmethod, process.env.PRIVATE_KEY, config.requestorname, request);

    console.log('irma.irmaDiscloseRequest called: ', {
        url: config.irma,
        request: JSON.stringify(request),
        authmethod
    });

    try {
        const { sessionPtr, token } = await irmaBackend.startSession(jwt);
        req.session.token = token;
        return res.status(200).json(sessionPtr);
    } catch (e) {
        console.log('irma.startSession error:', JSON.stringify(e));
        error(e, res);
    }
};

const getCredentialSourceFromRequest = req => {
    return req && req.query.demo === 'true' && process.env.NODE_ENV !== 'production'
        ? CREDENTIALS_TO_REQUEST.DEMO
        : CREDENTIALS_TO_REQUEST.PRODUCTION;
};

async function irmaDiscloseDemo1_18(req, res) {
    return irmaDiscloseRequest(req, res, getCredentialSourceFromRequest(req).DEMO1_18());
}

async function irmaDiscloseDemo1_65(req, res) {
    return irmaDiscloseRequest(req, res, getCredentialSourceFromRequest(req).DEMO1_65());
}

async function irmaDiscloseDemo2(req, res) {
    return irmaDiscloseRequest(req, res, getCredentialSourceFromRequest(req).DEMO2);
}
async function irmaDiscloseDemo3(req, res) {
    return irmaDiscloseRequest(req, res, getCredentialSourceFromRequest(req).DEMO3);
}
async function irmaDiscloseDemo4(req, res) {
    return irmaDiscloseRequest(req, res, getCredentialSourceFromRequest(req).DEMO4);
}

async function irmaDiscloseDemo5(req, res) {
    return irmaDiscloseRequest(req, res, getCredentialSourceFromRequest(req).DEMO5(req.query.phone, req.query.email));
}

const getConfig = async (req, res) => {
    config.environment = process.env.NODE_ENV;
    res.json(config);
};

const getIrmaSessionResult = async (req, res) => {
    try {
        const result = await irmaBackend.getSessionResult(req.session.token);

        // Remove the IRMA and backend session if status is DONE
        if (result.status === "DONE") {
            const res = await irmaBackend.cancelSession(req.session.token);
            req.session.destroy();
        }

        res.json(result);
    } catch (e) {
        console.log('irma.getSessionResuilt error:', JSON.stringify(e));
        error(e, res);
    }
};

const error = (e, res) => {
    if (res) {
        res.json({ error: jsonError });
    }
};

init();
