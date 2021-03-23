import express from 'express';
import cors from 'cors';

// Setup Express
export default ({ app }: { app: express.Application }) => {
    // Health check endpoint
    app.get('/health', (req, res) => res.status(200).send('Healthy!'));

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Parse request body as JSON
    app.use(express.json());
};
