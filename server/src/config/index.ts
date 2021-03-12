import dotenv from 'dotenv';
import configDev from './config.dev';
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

const configToUse = process.env.NODE_ENV === 'development' ? configDev : configProd;
configToUse.environment = process.env.NODE_ENV;

export const config: IConfig = configToUse;
