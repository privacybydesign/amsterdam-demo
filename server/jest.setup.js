// typedi's @Service() decorators rely on reflect-metadata being loaded first.
require('reflect-metadata');

// config/index.ts throws unless PRIVATE_KEY is set. The demo route modules pull
// that config in transitively, so provide a dummy value for the test run.
process.env.PRIVATE_KEY = process.env.PRIVATE_KEY || 'test-private-key';

// session.ts now throws unless SESSION_KEY is set (mirrors the PRIVATE_KEY
// check). Provide a dummy secret so the session middleware can boot in tests.
process.env.SESSION_KEY = process.env.SESSION_KEY || 'test-session-key';
