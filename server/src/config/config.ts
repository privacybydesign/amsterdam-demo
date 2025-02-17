import { IConfig } from '@config/index';

const config: IConfig = {
    requestorname: 'ams-di-demo',
    irma: process.env.IRMA_SERVER_URL ?? 'http://localhost:8080',
    docroot: '../client',
    port: 8000
};

export default config;
