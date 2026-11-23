import { createHash, createHmac } from 'crypto';
import express from 'express';
import request from 'supertest';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import appLoader from '@loaders/index';
import { startVote } from '@test/helpers';

/**
 * Tests for the /demos/result binding behaviour: results can only be read by
 * the browser that started the IRMA session, so knowing an IRMA token alone
 * does not grant access to the disclosed attributes.
 */
describe('GET /demos/result session binding', () => {
    const fakeToken = 'fake-irma-token';
    const fakeSessionPtr = { u: 'https://irma.example/session/abc', irmaqr: 'signing' };
    const doneResult = { status: 'DONE', disclosed: [] };

    const startDisclosure = jest.fn().mockResolvedValue({ token: fakeToken, sessionPtr: fakeSessionPtr });

    let app: express.Application;

    beforeAll(async () => {
        Container.set(IrmaService, {
            requestSignatureSession: jest.fn().mockResolvedValue({ token: fakeToken, sessionPtr: fakeSessionPtr }),
            requestDisclosureSession: startDisclosure,
            requestSessionResult: jest.fn().mockResolvedValue(doneResult)
        });

        app = express();
        await appLoader({ app, config });
    });

    afterAll(() => {
        Container.reset();
    });

    // The name=value pairs of the cookies a response sets.
    const cookiesOf = (res: request.Response): string[] =>
        ([] as string[]).concat(res.headers['set-cookie'] ?? []).map(c => c.split(';')[0]);

    const bindingCookieOf = (res: request.Response): string =>
        cookiesOf(res).find(c => c.includes('.result.')) as string;

    it('rejects a request without a sid', async () => {
        const response = await request(app).get('/demos/result');
        expect(response.status).toBe(403);
    });

    it('rejects a request without a sid, also after a session was started', async () => {
        const agent = request.agent(app);
        await startVote(agent);

        const response = await agent.get('/demos/result');
        expect(response.status).toBe(403);
    });

    it('rejects a request whose sid does not match a started session', async () => {
        const agent = request.agent(app);
        await startVote(agent);

        const response = await agent.get('/demos/result').query({ sid: 'some-other-token' });
        expect(response.status).toBe(403);
    });

    it('binds the token on the vote flow so a matching sid is served', async () => {
        const agent = request.agent(app);
        const start = await startVote(agent);
        expect(start.status).toBe(200);
        expect(start.body).toEqual({ sessionPtr: fakeSessionPtr, sessionId: encodeURIComponent(fakeToken) });

        const response = await agent.get('/demos/result').query({ sid: fakeToken });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(doneResult);
    });

    it('rejects a vote token that was started by another browser', async () => {
        await startVote(request.agent(app));

        const response = await request.agent(app).get('/demos/result').query({ sid: fakeToken });
        expect(response.status).toBe(403);
    });

    describe('when the server-side session has expired (#66)', () => {
        // The session is started on page load, so the QR code can be on screen
        // for longer than the server-side session lives (6 minutes). Only the
        // binding cookie is sent here, as if the express-session was gone.
        it('still serves the result of a disclosure session', async () => {
            startDisclosure.mockResolvedValueOnce({ token: 'token-idle', sessionPtr: fakeSessionPtr });
            const start = await request(app).get('/demos/demo4');
            const binding = bindingCookieOf(start);
            expect(binding).toBeDefined();

            const response = await request(app)
                .get('/demos/result')
                .set('Cookie', binding)
                .query({ sid: 'token-idle' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(doneResult);
        });

        it('still serves the result of a vote session', async () => {
            const start = await startVote(request.agent(app));
            const binding = bindingCookieOf(start);
            expect(binding).toBeDefined();

            const response = await request(app).get('/demos/result').set('Cookie', binding).query({ sid: fakeToken });
            expect(response.status).toBe(200);
        });
    });

    describe('disclosure sessions started in parallel (#66)', () => {
        // The demo pages start their IRMA session on page load, so one browser
        // routinely holds several open sessions (other tabs, other demos, the
        // two sessions of demo 1). Each must keep access to its own result.
        it('still serves the first session after a second one is started in the same browser', async () => {
            startDisclosure
                .mockResolvedValueOnce({ token: 'token-tab-1', sessionPtr: fakeSessionPtr })
                .mockResolvedValueOnce({ token: 'token-tab-2', sessionPtr: fakeSessionPtr });

            const agent = request.agent(app);
            await agent.get('/demos/demo4');
            await agent.get('/demos/demo3');

            const first = await agent.get('/demos/result').query({ sid: 'token-tab-1' });
            expect(first.status).toBe(200);
            const second = await agent.get('/demos/result').query({ sid: 'token-tab-2' });
            expect(second.status).toBe(200);
        });

        it('serves both sessions when they are started concurrently by a browser without cookies', async () => {
            startDisclosure
                .mockResolvedValueOnce({ token: 'token-18', sessionPtr: fakeSessionPtr })
                .mockResolvedValueOnce({ token: 'token-65', sessionPtr: fakeSessionPtr });

            // Neither request carries a cookie yet, as on a first visit to demo 1.
            const [start18, start65] = await Promise.all([
                request(app).get('/demos/demo1/18'),
                request(app).get('/demos/demo1/65')
            ]);
            // The browser keeps the cookies of both responses; same-named ones are overwritten.
            const jar = new Map<string, string>();
            for (const cookie of [...cookiesOf(start18), ...cookiesOf(start65)]) {
                jar.set(cookie.split('=')[0], cookie);
            }
            const cookieHeader = [...jar.values()].join('; ');

            for (const start of [start18, start65]) {
                const response = await request(app)
                    .get('/demos/result')
                    .set('Cookie', cookieHeader)
                    .query({ sid: decodeURIComponent(start.body.sessionId) });
                expect(response.status).toBe(200);
            }
        });

        it('rejects a token that was started by another browser', async () => {
            startDisclosure.mockResolvedValueOnce({ token: 'token-victim', sessionPtr: fakeSessionPtr });
            await request.agent(app).get('/demos/demo4');

            const attacker = request.agent(app);
            await attacker.get('/demos/demo4');
            const response = await attacker.get('/demos/result').query({ sid: 'token-victim' });
            expect(response.status).toBe(403);
        });

        it('rejects a forged binding cookie', async () => {
            startDisclosure.mockResolvedValueOnce({ token: 'token-forged', sessionPtr: fakeSessionPtr });
            const start = await request(app).get('/demos/demo4');
            const binding = bindingCookieOf(start);
            expect(binding).toBeDefined();

            const response = await request(app)
                .get('/demos/result')
                .set('Cookie', `${binding.split('=')[0]}=not-the-signature`)
                .query({ sid: 'token-forged' });
            expect(response.status).toBe(403);
        });

        it.each(['production', 'acceptance', 'test'])(
            'rejects a binding cookie signed with a well-known key when SESSION_KEY is unset (NODE_ENV=%s)',
            async environment => {
                // Everything needed to forge the cookie can be derived from the
                // token, except the key. 'local' used to be the fallback key.
                expect(process.env.SESSION_KEY).toBeUndefined();
                const token = 'token-known-key';
                const name = `${config.requestorname}.result.${createHash('sha256')
                    .update(token)
                    .digest('hex')
                    .slice(0, 24)}`;
                const forgeries = ['local', ''].flatMap(key =>
                    [token, `result-binding:${token}`].map(input =>
                        createHmac('sha256', key).update(input).digest('base64url')
                    )
                );

                const originalEnvironment = process.env.NODE_ENV;
                process.env.NODE_ENV = environment;
                try {
                    for (const forgery of forgeries) {
                        const response = await request(app)
                            .get('/demos/result')
                            .set('Cookie', `${name}=${forgery}`)
                            .query({ sid: token });
                        expect(response.status).toBe(403);
                    }
                } finally {
                    process.env.NODE_ENV = originalEnvironment;
                }
            }
        );

        it('drops the binding once the result is done', async () => {
            startDisclosure.mockResolvedValueOnce({ token: 'token-done', sessionPtr: fakeSessionPtr });
            const agent = request.agent(app);
            await agent.get('/demos/demo4');

            expect((await agent.get('/demos/result').query({ sid: 'token-done' })).status).toBe(200);
            expect((await agent.get('/demos/result').query({ sid: 'token-done' })).status).toBe(403);
        });
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
