import express from 'express';
import request from 'supertest';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import appLoader from '@loaders/index';
import { startVote } from '@test/helpers';

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
        const response = await startVote(request.agent(app));

        // Before the fix for #24 req.session was undefined, so the handler
        // threw a TypeError and the response came back as 500 instead of 200.
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ sessionPtr: fakeSessionPtr, sessionId: encodeURIComponent(fakeToken) });

        // The result is requested with the binding cookie of this session.
        expect(String(response.headers['set-cookie'])).toContain(`${config.requestorname}.result.`);

        const requestSignatureSession = Container.get(IrmaService).requestSignatureSession as jest.Mock;
        expect(requestSignatureSession).toHaveBeenCalledWith(expect.anything(), 'vote: Light sculpture #3');
    });

    it('rejects a CSRF token that was issued to another browser', async () => {
        const attacker = request.agent(app);
        const { body } = await attacker.get('/demos/vote/csrf-token');

        const victim = request.agent(app);
        await victim.get('/demos/vote/csrf-token');
        const response = await victim
            .post('/demos/vote/start')
            .set('x-csrf-token', body.csrfToken)
            .send({ msg: { vote: 'Light sculpture #3' } });
        expect(response.status).toBe(403);
    });

    it('rejects a start request without the CSRF token of this browser', async () => {
        const agent = request.agent(app);
        await agent.get('/demos/vote/csrf-token');

        const missing = await agent.post('/demos/vote/start').send({ msg: { vote: 'Light sculpture #3' } });
        expect(missing.status).toBe(403);

        const wrong = await agent
            .post('/demos/vote/start')
            .set('x-csrf-token', 'not-the-token')
            .send({ msg: { vote: 'Light sculpture #3' } });
        expect(wrong.status).toBe(403);
    });

    it.each([
        ['a missing message', null],
        ['a string', 'vote: forged'],
        ['an array', ['vote']],
        ['a non-string value', { vote: { nested: true } }],
        ['a line break in a value', { vote: 'Light sculpture #3\nvote: Something else' }],
        ['a line break in a key', { 'vote\nextra': 'x' }],
        ['a value that is too long', { vote: 'x'.repeat(513) }],
        ['too many entries', Object.fromEntries(Array.from({ length: 21 }, (_, i) => [`key${i}`, 'x']))]
    ])('rejects %s', async (_description, msg) => {
        const requestSignatureSession = Container.get(IrmaService).requestSignatureSession as jest.Mock;
        requestSignatureSession.mockClear();

        const response = await startVote(request.agent(app), msg);
        expect(response.status).toBe(400);
        expect(requestSignatureSession).not.toHaveBeenCalled();
    });
});
