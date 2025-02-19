import express from 'express';
import path from 'path';
import { ILoaderArgs } from '.';
import Logger from './logger';
const createProxyMiddleware = require('http-proxy-middleware');


// Setup frontend
export default ({ app, config }: ILoaderArgs) => {
    if (process.env.NODE_ENV !== 'development') {
        app.use(express.static(config.docroot, { index: false }));
        app.get('*', function (req, res) {
            res.sendFile(path.join(process.cwd(), config.docroot, 'index.html'));
        });
    } else {
        Logger.info('Set up proxy to frontend.');
        // Proxy the root to the react app container in development mode
        app.use('/', createProxyMiddleware({ target: process.env.FE_URL, changeOrigin: true }));
    }
};
