import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@app/App';
import '@services/usabilla';

const container = document.getElementById('app');
const root = createRoot(container as HTMLElement);
root.render(
    <Router>
        <App />
    </Router>
);
