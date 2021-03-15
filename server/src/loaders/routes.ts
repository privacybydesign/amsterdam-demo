import express from 'express';
import routes from '@api/index';

// Setup Express
export default ({ app }: { app: express.Application }) => {
    // Load API routes
    app.use(routes());
};
