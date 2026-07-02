import express from 'express';
import helmet from 'helmet';
import { config } from '@config/index';
import { corsMiddleware } from '@loaders/cors';

// External hosts referenced by client/src/index.ejs (Amsterdam webfonts +
// Siteimprove analytics). Kept explicit so tightening the CSP does not
// silently break them.
const AMSTERDAM_STATIC = 'https://static.amsterdam.nl';
const SITEIMPROVE = 'https://siteimproveanalytics.com';

// Setup Express
export default ({ app }: { app: express.Application }) => {
    // Health check endpoint
    app.get('/health', (req, res) => res.status(200).send('Healthy!'));

    // Restrict Cross Origin Resource Sharing to an explicit allowlist.
    app.use(corsMiddleware());

    // Use helmet to protect from some HTTP header vulnerabilities, including a
    // Content-Security-Policy. The policy is deliberately narrow: scripts and
    // XHR/fetch/EventSource are same-origin only (plus the known external
    // font/analytics hosts and any configured IRMA origin), styles allow the
    // inline <style> tags styled-components injects at runtime, and images
    // allow the data: URIs used to render IRMA/Yivi QR codes.
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", AMSTERDAM_STATIC, SITEIMPROVE],
                    styleSrc: ["'self'", "'unsafe-inline'", AMSTERDAM_STATIC],
                    fontSrc: ["'self'", 'data:', AMSTERDAM_STATIC],
                    imgSrc: ["'self'", 'data:'],
                    connectSrc: ["'self'", SITEIMPROVE, ...config.cspConnectSrc],
                    objectSrc: ["'none'"],
                    frameAncestors: ["'self'"],
                    baseUri: ["'self'"],
                    formAction: ["'self'"],
                    // Do not force http->https upgrades: the dev server and the
                    // local IRMA server are served over plain http.
                    upgradeInsecureRequests: null
                }
            }
        })
    );
app.use((req, res, next) => {
  res.set({
    'Permissions-Policy':
      'geolocation=(),midi=(),sync-xhr=(),microphone=(),camera=(),magnetometer=(),gyroscope=(),fullscreen=(self),payment=()',
  });
  next();
});
    // Parse request body as JSON
    app.use(express.json());
};
