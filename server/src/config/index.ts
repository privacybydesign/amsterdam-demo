import dotenv from 'dotenv';
import configDev from './config.dev';
import configAcc from './config.acc';
import configProd from './config.prod';

// Load .env file (if present)
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Check for PRIVATE KEY to access IRMA server
if (!process.env.PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY is not set!');
}

export interface IConfig {
    requestorname: string;
    irma: string;
    docroot: string;
    port: number;
    environment?: string;
}

let configToUse: IConfig = configDev;
if (process.env.NODE_ENV === 'acceptance') {
    configToUse = configAcc;
} else if (process.env.NODE_ENV === 'production') {
    configToUse = configProd;
}

configToUse.environment = process.env.NODE_ENV;

export const config: IConfig = configToUse;
