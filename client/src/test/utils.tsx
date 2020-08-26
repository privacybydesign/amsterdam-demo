import React from 'react';
import { ThemeProvider } from '@datapunt/asc-ui';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export const history = createMemoryHistory();

interface IProps {}

export const withAppContext: React.FC<IProps> = Component => (
    <ThemeProvider>
        <Router history={history}>{Component}</Router>
    </ThemeProvider>
);
