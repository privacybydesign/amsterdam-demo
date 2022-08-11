import { config, IConfig } from '@config/index';
import express from 'express';
import expressLoader from './express';
import sessionLoader from './session';
import routesLoader from './routes';
import frontendLoader from './frontend';
import Logger from './logger';

export interface ILoaderArgs {
    app: express.Application;
    config: IConfig;
}

// Main app setup
export default async (loaderArgs: ILoaderArgs) => {
    await expressLoader(loaderArgs);
    await routesLoader(loaderArgs);
    await frontendLoader(loaderArgs);

    Logger.info(`App loaded using config: ${JSON.stringify(config)}`);
};
