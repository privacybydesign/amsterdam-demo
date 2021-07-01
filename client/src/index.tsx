import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@app/App';
import '@services/usabilla';
import {} from 'styled-components/cssprop';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);
