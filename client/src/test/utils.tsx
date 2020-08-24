import React from 'react';
import { ThemeProvider } from '@datapunt/asc-ui';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export const history = createMemoryHistory();

export const withAppContext = (Component) => (
  <ThemeProvider>
    <Router history={history}>
      {Component}
    </Router>
  </ThemeProvider>
);

