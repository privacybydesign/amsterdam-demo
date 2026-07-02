import express from 'express';
import request from 'supertest';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import appLoader from '@loaders/index';
import { validateVoteMessage } from '@api/vote';

/**
 * Tests for the security hardening in advisory GHSA-5hqq-jmjf-rw22:
 *  - /demos/result only serves results bound to the caller's own session;
 *  - POST /demos/vote/start validates req.body.msg against an allowlist;
 *  - GET /config returns a minimal DTO without the internal IRMA URL.
 */
describe('security hardening (GHSA-5hqq-jmjf-rw22)', () => {
    const fakeToken = 'fake-irma-token';
    const fakeSessionPtr = { u: 'https://irma.example/session/abc', irmaqr: 'signing' };
    const doneResult = { status: 'DONE', disclosed: [] };

    let app: express.Application;

    beforeAll(async () => {
        Container.set(IrmaService, {
            requestSignatureSession: jest.fn().mockResolvedValue({ token: fakeToken, sessionPtr: fakeSessionPtr }),
            requestSessionResult: jest.fn().mockResolvedValue(doneResult)
        });

        app = express();
        await appLoader({ app, config });
    });

    afterAll(() => {
        Container.reset();
    });

    describe('GET /demos/result', () => {
        it('rejects a request with no bound session token', async () => {
            const response = await request(app).get('/demos/result');
            expect(response.status).toBe(403);
        });

        it('rejects a request whose sid does not match the session token', async () => {
            // Bind a token to the session by starting a vote, keeping the cookie.
            const agent = request.agent(app);
            await agent
                .post('/demos/vote/start')
                .send({ msg: { vote: 'Light sculpture #3' } })
                .set('Content-Type', 'application/json');

            const response = await agent.get('/demos/result').query({ sid: 'some-other-token' });
            expect(response.status).toBe(403);
        });

        it('serves the result for the session-bound token when no sid is supplied', async () => {
            const agent = request.agent(app);
            await agent
                .post('/demos/vote/start')
                .send({ msg: { vote: 'Light sculpture #3' } })
                .set('Content-Type', 'application/json');

            const response = await agent.get('/demos/result');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(doneResult);
        });
    });

    describe('POST /demos/vote/start message validation', () => {
        it.each([
            ['a non-object msg', { msg: 'not-an-object' }],
            ['an empty msg', { msg: {} }],
            ['a disallowed field', { msg: { evil: 'sign this' } }],
            ['a non-string value', { msg: { vote: 42 } }],
            ['an over-long value', { msg: { vote: 'x'.repeat(257) } }]
        ])('rejects %s with 400', async (_label, body) => {
            const response = await request(app).post('/demos/vote/start').send(body).set('Content-Type', 'application/json');
            expect(response.status).toBe(400);
        });

        it('accepts a valid msg', () => {
            expect(validateVoteMessage({ vote: 'Light sculpture #3' })).toBeNull();
        });
    });

    describe('GET /config', () => {
        it('returns only the environment, not the internal IRMA URL', async () => {
            const response = await request(app).get('/config');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ environment: config.environment });
            expect(response.body).not.toHaveProperty('irma');
        });
    });
});
