import React, { ReactElement } from 'react';
import { Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { toBeVisible, toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import { render, RenderResult, RenderOptions, cleanup } from '@testing-library/react';
import { GlobalStyle, ThemeProvider } from '@datapunt/asc-ui';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import theme from '@services/theme';

expect.extend({ toBeVisible, toBeInTheDocument });

export const history = createMemoryHistory();

const providers = ({ children }): ReactElement => (
    <ThemeProvider overrides={theme}>
        <GlobalStyle />
        <Router history={history}>
            <Route path="/">{children}</Route>
        </Router>
    </ThemeProvider>
);

export const wrappedRender = (ui: ReactElement, options?: RenderOptions): RenderResult =>
    render(ui, { wrapper: providers, ...options });

export const setupMocks = (): void => {
    let mockedAxios;

    beforeEach(() => {
        // Mock timers
        jest.useFakeTimers();

        // Mock axios
        mockedAxios = new MockAdapter(axios);
        setupMockedAPI(mockedAxios);
    });

    afterEach(() => {
        // Unmock timers
        jest.runOnlyPendingTimers();
        jest.useRealTimers();

        // Unmock axios
        mockedAxios.reset();
        mockedAxios.restore();

        // Restore jest mocks
        jest.restoreAllMocks();

        // Clean all globals
        cleanup();
    });
};

const setupMockedAPI = (mockedAxios: MockAdapter): void => {
    mockedAxios.onGet('/config').reply(200, {
        environment: 'acceptance'
    });

    mockedAxios.onGet('/getsession/test').reply(200, {
        sessionPtr: {
            u: 'https://acc.attr.auth.amsterdam.nl/irma/session/testSessionID',
            irmaqr: 'disclosing'
        },
        token: 'fake-test-token'
    });
};
