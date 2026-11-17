import express from 'express';
import request from 'supertest';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import appLoader from '@loaders/index';

/**
 * Regression test for issue #24: the session middleware was declared in
 * loaders/session.ts but never wired into the Express app, so POST
 * /demos/vote/start threw a TypeError when the handler wrote to req.session.
 *
 * This test boots the real loader chain (loaders/index.ts) and exercises the
 * vote endpoint. IrmaService is stubbed so no IRMA server is needed.
 */
describe('POST /demos/vote/start', () => {
    const fakeSessionPtr = { u: 'https://irma.example/session/abc', irmaqr: 'signing' };
    const fakeToken = 'fake-irma-token';

    let app: express.Application;

    beforeAll(async () => {
        // Build the app the same way app.ts does, but inject a stub IrmaService
        // so requestSignatureSession does not hit the network.
        Container.set(IrmaService, {
            requestSignatureSession: jest.fn().mockResolvedValue({
                token: fakeToken,
                sessionPtr: fakeSessionPtr
            })
        });

        app = express();
        await appLoader({ app, config });
    });

    afterAll(() => {
        Container.reset();
    });

    it('returns the session pointer and binds the IRMA token to the browser', async () => {
        const response = await request(app)
            .post('/demos/vote/start')
            .send({ msg: { vote: 'Light sculpture #3' } })
            .set('Content-Type', 'application/json');

        // Before the fix for #24 req.session was undefined, so the handler
        // threw a TypeError and the response came back as 500 instead of 200.
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ sessionPtr: fakeSessionPtr, sessionId: encodeURIComponent(fakeToken) });

        // The result is requested with the binding cookie of this session.
        const setCookie = response.headers['set-cookie'];
        expect(setCookie).toBeDefined();
        expect(String(setCookie)).toContain(`${config.requestorname}.result.`);
    });
});
