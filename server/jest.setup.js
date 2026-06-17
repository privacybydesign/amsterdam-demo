// typedi's @Service() decorators rely on reflect-metadata being loaded first.
require('reflect-metadata');

// config/index.ts throws unless PRIVATE_KEY is set. The demo route modules pull
// that config in transitively, so provide a dummy value for the test run.
process.env.PRIVATE_KEY = process.env.PRIVATE_KEY || 'test-private-key';
