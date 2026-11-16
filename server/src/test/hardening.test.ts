import express from 'express';
import request from 'supertest';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import appLoader from '@loaders/index';
import { getSessionSecret } from '@loaders/session';

/**
 * Tests for the hardening of the HTTP layer: response headers, CORS, the
 * /config response and the secret that signs the cookies.
 */
describe('HTTP hardening', () => {
    let app: express.Application;

    beforeAll(async () => {
        Container.set(IrmaService, {});
        app = express();
        await appLoader({ app, config });
    });

    afterAll(() => {
        Container.reset();
    });

    it('sends a Content-Security-Policy', async () => {
        const response = await request(app).get('/config');
        const csp = response.headers['content-security-policy'];
        expect(csp).toContain("default-src 'self'");
        expect(csp).toContain("object-src 'none'");
        expect(csp).toContain("frame-ancestors 'none'");
        expect(csp).not.toContain("'unsafe-eval'");
        expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
    });

    it('does not allow cross-origin reads', async () => {
        const response = await request(app).get('/config').set('Origin', 'https://attacker.example');
        expect(response.headers['access-control-allow-origin']).toBeUndefined();

        const preflight = await request(app)
            .options('/demos/vote/start')
            .set('Origin', 'https://attacker.example')
            .set('Access-Control-Request-Method', 'POST');
        expect(preflight.headers['access-control-allow-origin']).toBeUndefined();
    });

    it('only exposes the environment on /config', async () => {
        const response = await request(app).get('/config');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ environment: config.environment });
    });

    it('does not create a session outside /demos', async () => {
        const response = await request(app).get('/config');
        expect(response.headers['set-cookie']).toBeUndefined();
    });

    it('reports the rate limit', async () => {
        const response = await request(app).get('/config');
        expect(response.headers['ratelimit']).toBeDefined();
    });
});

describe('getSessionSecret', () => {
    const originalEnv = { ...process.env };

    afterEach(() => {
        process.env = { ...originalEnv };
    });

    it('uses SESSION_KEY when it is set', () => {
        process.env.SESSION_KEY = 'configured-secret';
        expect(getSessionSecret()).toBe('configured-secret');
    });

    it('refuses to start without SESSION_KEY on a deployed environment', () => {
        delete process.env.SESSION_KEY;
        process.env.NODE_ENV = 'production';
        expect(() => getSessionSecret()).toThrow('SESSION_KEY is not set!');
    });

    it('generates a random secret for local development', () => {
        delete process.env.SESSION_KEY;
        process.env.NODE_ENV = 'development';
        const secret = getSessionSecret();
        expect(secret).toMatch(/^[0-9a-f]{64}$/);
        expect(secret).not.toBe('local');
        expect(getSessionSecret()).toBe(secret);
    });
});
