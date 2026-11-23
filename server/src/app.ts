import 'reflect-metadata';
import express from 'express';
import { config } from '@config/index';
import Logger from '@loaders/logger';

async function init() {
    const app = express();

    await require('./loaders').default({ app, config });

    const server = app
        .listen(config.port, () => {
            Logger.info(`🛡️ Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${config.port}.`);
        })
        .on('error', err => {
            Logger.error(err);
            process.exit(1);
        });

    // The container runs node directly (as PID 1), so stop on the signals the
    // container runtime sends instead of waiting to be killed.
    for (const signal of ['SIGTERM', 'SIGINT'] as const) {
        process.on(signal, () => {
            Logger.info(`Received ${signal}, shutting down.`);
            server.close(() => process.exit(0));
            server.closeIdleConnections();
            // Do not wait forever for connections that stay open.
            setTimeout(() => process.exit(0), 10000).unref();
        });
    }
}

init();
