import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { isTlsEnvironment } from './session';

// Content Security Policy for the demo frontend, which is served by this app.
const contentSecurityPolicyDirectives = () => {
    const tls = isTlsEnvironment();

    return {
        defaultSrc: ["'self'"],
        // The Amsterdam font tracking script and Siteimprove analytics are loaded from index.html.
        scriptSrc: ["'self'", 'https://static.amsterdam.nl', 'https://siteimproveanalytics.com'],
        // styled-components and style-loader inject <style> elements at runtime.
        styleSrc: ["'self'", "'unsafe-inline'", 'https://static.amsterdam.nl'],
        fontSrc: ["'self'", 'data:', 'https://static.amsterdam.nl'],
        // Map tiles and analytics beacons.
        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
        // The browser talks to the IRMA server directly; its public URL is only known at
        // runtime (it is part of the session pointer), so any https origin is allowed.
        // Local setups run the IRMA server and the webpack dev server over plain http.
        connectSrc: tls ? ["'self'", 'https:'] : ["'self'", 'https:', 'http:', 'ws:'],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        // Only upgrade requests where TLS is available.
        upgradeInsecureRequests: tls ? [] : null
    };
};

// Setup Express
export default ({ app }: { app: express.Application }) => {
    // TLS is terminated by a single proxy in front of the app; trust it so that
    // req.ip (rate limiting) and req.secure (secure cookies) are correct.
    if (isTlsEnvironment()) {
        app.set('trust proxy', 1);
    }

    // Health check endpoint
    app.get('/health', (req, res) => res.status(200).send('Healthy!'));

    // Limit the number of requests per client, static files included.
    app.use(
        rateLimit({
            windowMs: 60 * 1000,
            limit: 600,
            standardHeaders: 'draft-7',
            legacyHeaders: false
        })
    );

    // Use helmet to protect from some HTTP header vulnerabilities
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: false,
                directives: contentSecurityPolicyDirectives()
            }
        })
    );
    app.use((req, res, next) => {
        res.set({
            'Permissions-Policy':
                'geolocation=(),midi=(),sync-xhr=(),microphone=(),camera=(),magnetometer=(),gyroscope=(),fullscreen=(self),payment=()'
        });
        next();
    });
    // Parse request body as JSON
    app.use(express.json({ limit: '10kb' }));
};
