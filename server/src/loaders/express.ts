import express from 'express';
import cors from 'cors';
import path from 'path';

// Setup Express
export default ({ app }: { app: express.Application }) => {
    // Health check endpoint
    app.get('/health', (req, res) => res.status(200).send('Healthy!'));
    app.get('/cwd', (req, res) => res.status(200).send(`${path.join(process.cwd(), 'static/403.html')}`));

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Parse request body as JSON
    app.use(express.json());
};
