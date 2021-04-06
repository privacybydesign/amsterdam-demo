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
