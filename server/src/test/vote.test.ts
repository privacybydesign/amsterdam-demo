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
 * vote endpoint. IrmaService is stubbed so no IRMA server is needed; the only
 * thing under test is that req.session is a real object at request time, which
 * it only is when the session middleware is registered before the routes.
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

    it('stores the IRMA token on the session and returns the session pointer', async () => {
        const response = await request(app)
            .post('/demos/vote/start')
            .send({ msg: { vote: 'Light sculpture #3' } })
            .set('Content-Type', 'application/json');

        // Before the fix req.session was undefined, so the handler threw a
        // TypeError, was caught and forwarded to the default error handler,
        // and the response came back as 500 instead of 200.
        expect(response.status).toBe(200);
        expect(response.body).toEqual(fakeSessionPtr);

        // The session middleware must have set the session cookie.
        const setCookie = response.headers['set-cookie'];
        expect(setCookie).toBeDefined();
        expect(String(setCookie)).toContain(`${config.requestorname}.sid`);
    });
});
