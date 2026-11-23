import request from 'supertest';
import { CSRF_HEADER } from '@loaders/session';

type Agent = ReturnType<typeof request.agent>;

/**
 * Starts a vote session the way the frontend does: fetch the CSRF token of the
 * session first, then send it along with the start request.
 */
export const startVote = async (agent: Agent, msg: unknown = { vote: 'Light sculpture #3' }) => {
    const { body } = await agent.get('/demos/vote/csrf-token');
    return agent.post('/demos/vote/start').set(CSRF_HEADER, body.csrfToken).send({ msg });
};
