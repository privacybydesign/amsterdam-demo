import express from 'express';
import request from 'supertest';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import appLoader from '@loaders/index';

/**
 * Tests for the /demos/result session-binding behaviour: results can only be
 * read by the same browser session that started the flow, so knowing an IRMA
 * token alone no longer grants access to the disclosed attributes.
 */
describe('GET /demos/result session binding', () => {
    const fakeToken = 'fake-irma-token';
    const fakeSessionPtr = { u: 'https://irma.example/session/abc', irmaqr: 'signing' };
    const doneResult = { status: 'DONE', disclosed: [] };

    let app: express.Application;

    beforeAll(async () => {
        Container.set(IrmaService, {
            requestSignatureSession: jest.fn().mockResolvedValue({ token: fakeToken, sessionPtr: fakeSessionPtr }),
            requestDisclosureSession: jest.fn().mockResolvedValue({ token: fakeToken, sessionPtr: fakeSessionPtr }),
            requestSessionResult: jest.fn().mockResolvedValue(doneResult)
        });

        app = express();
        await appLoader({ app, config });
    });

    afterAll(() => {
        Container.reset();
    });

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

    it('serves the result when the supplied sid matches the session-bound token', async () => {
        const agent = request.agent(app);
        await agent
            .post('/demos/vote/start')
            .send({ msg: { vote: 'Light sculpture #3' } })
            .set('Content-Type', 'application/json');

        const response = await agent.get('/demos/result').query({ sid: fakeToken });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(doneResult);
    });

    it('binds the token on the disclosure flow so a matching sid is served', async () => {
        // Start a disclosure session (processDemoRequest → requestDisclosureSession),
        // which is the path this fix adds the session-binding to. The disclosure
        // demos send the returned token back as ?sid.
        const agent = request.agent(app);
        const start = await agent.get('/demos/demo1/18');
        expect(start.status).toBe(200);
        expect(start.body.sessionId).toBe(encodeURIComponent(fakeToken));

        const response = await agent.get('/demos/result').query({ sid: fakeToken });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(doneResult);
    });
});
