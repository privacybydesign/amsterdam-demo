import { IConfig } from '@config/index';

// Parse a comma-separated env var into a trimmed list of origins/hosts.
const parseList = (value?: string): string[] =>
    (value ?? '')
        .split(',')
        .map(entry => entry.trim())
        .filter(Boolean);

const config: IConfig = {
    requestorname: 'ams-di-demo',
    irma: process.env.IRMA_SERVER_URL ?? 'http://localhost:8080',
    docroot: '../client',
    port: 8000,
    // Explicit CORS allowlist. Same-origin / no-Origin requests are always
    // allowed; cross-origin browsers are only allowed when their Origin is
    // listed here (set CORS_ALLOWED_ORIGINS as a comma-separated list).
    allowedOrigins: parseList(process.env.CORS_ALLOWED_ORIGINS),
    // Extra hosts the browser may connect to (fetch/XHR/EventSource) on top of
    // 'self'. Set CSP_CONNECT_SRC to the public IRMA server origin when it is
    // served from a different origin than the app.
    cspConnectSrc: parseList(process.env.CSP_CONNECT_SRC)
};

export default config;
