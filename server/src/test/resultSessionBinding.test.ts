import express from 'express';
import request from 'supertest';
import { Container } from 'typedi';
import { config } from '@config/index';
import IrmaService from '@services/IrmaService';
import appLoader from '@loaders/index';
import { startVote } from '@test/helpers';

/**
 * Tests for the /demos/result session-binding behaviour: results can only be
 * read by the same browser session that started the flow, so knowing an IRMA
 * token alone no longer grants access to the disclosed attributes.
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

    it('rejects a request with no bound session token', async () => {
        const response = await request(app).get('/demos/result');
        expect(response.status).toBe(403);
    });

    it('rejects a request whose sid does not match the session token', async () => {
        // Bind a token to the session by starting a vote, keeping the cookie.
        const agent = request.agent(app);
        await startVote(agent);

        const response = await agent.get('/demos/result').query({ sid: 'some-other-token' });
        expect(response.status).toBe(403);
    });

    it('serves the result for the session-bound token when no sid is supplied', async () => {
        const agent = request.agent(app);
        await startVote(agent);

        const response = await agent.get('/demos/result');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(doneResult);
    });

    it('serves the result when the supplied sid matches the session-bound token', async () => {
        const agent = request.agent(app);
        await startVote(agent);

        const response = await agent.get('/demos/result').query({ sid: fakeToken });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(doneResult);
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
            const cookiesOf = (res: request.Response) =>
                ([] as string[]).concat(res.headers['set-cookie'] ?? []).map(c => c.split(';')[0]);
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
            const binding = ([] as string[])
                .concat(start.headers['set-cookie'] ?? [])
                .map(c => c.split(';')[0])
                .find(c => c.includes('.result.')) as string;
            expect(binding).toBeDefined();

            const response = await request(app)
                .get('/demos/result')
                .set('Cookie', `${binding.split('=')[0]}=not-the-signature`)
                .query({ sid: 'token-forged' });
            expect(response.status).toBe(403);
        });

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
