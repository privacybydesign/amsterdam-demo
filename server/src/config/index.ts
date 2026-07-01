import dotenv from 'dotenv';
import configDev from './config';

// Load .env file (if present); quiet:true silences dotenv v17 promo tip lines on boot
dotenv.config({ quiet: true });

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

configToUse.environment = process.env.NODE_ENV;

export const config: IConfig = configToUse;
