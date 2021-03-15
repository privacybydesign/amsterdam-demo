import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { ILoaderArgs } from '.';
import Logger from './logger';
const createProxyMiddleware = require('http-proxy-middleware');

// Frontend authentication middleware used for acceptance
const secured = function (req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== 'acceptance') {
        return next();
    }

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).sendFile(path.join(__dirname, '/static/403.html'));
    }

    // check the entered credentials
    const credentials = Buffer.from('irma:demo').toString('base64');
    if (req.headers.authorization !== `Basic ${credentials}`) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.sendFile(path.join(__dirname, '/static/403.html'));
    }

    Logger.info('Frontend authentication is enabled.');

    next();
};

// Setup frontend
export default ({ app, config }: ILoaderArgs) => {
    if (process.env.NODE_ENV !== 'development') {
        app.use(express.static(config.docroot, { index: false }));
        app.get('*', secured, function (req, res) {
            res.sendFile(path.join(__dirname, config.docroot, 'index.html'));
        });
    } else {
        Logger.info('Set up proxy to frontend.');
        // Proxy the root to the react app container in development mode
        app.use('/', createProxyMiddleware({ target: process.env.FE_URL, changeOrigin: true }));
    }
};
