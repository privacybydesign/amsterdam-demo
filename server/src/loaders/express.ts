import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Setup Express
export default ({ app }: { app: express.Application }) => {
    // Health check endpoint
    app.get('/health', (req, res) => res.status(200).send('Healthy!'));

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Use helmet to protect from some HTTP header vulnerabilities
    // TODO: Add contentSecurityPolicy
    app.use(
        helmet({
            contentSecurityPolicy: false
        })
    );
app.use((req, res, next) => {
  res.set({
    'Permissions-Policy':
      'geolocation=(),midi=(),sync-xhr=(),microphone=(),camera=(),magnetometer=(),gyroscope=(),fullscreen=(self),payment=()',
  });
  next();
});
    // Parse request body as JSON
    app.use(express.json());
};
