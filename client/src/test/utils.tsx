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

    mockedAxios.onGet('https://api.data.amsterdam.nl/dataselectie/bag/?size=1&postcode=1011PT').reply(200, {
        aggs_list: {
            ggw_code: {
                buckets: [{ key: 'DX02', doc_count: 22 }],
                doc_count: 1
            },
            buurtcombinatie_naam: {
                buckets: [{ key: 'Test buurt', doc_count: 22 }],
                doc_count: 1
            },
            ggw_naam: {
                buckets: [{ key: 'Test gebied', doc_count: 22 }],
                doc_count: 1
            }
        }
    });

    mockedAxios
        .onGet(
            'https://geodata.nationaalgeoregister.nl/locatieserver/revgeo?type=adres&rows=1&fl=id,weergavenaam,straatnaam,huis_nlt,postcode,woonplaatsnaam,centroide_ll&distance=50&&lat=52.37311439594963&lon=4.893314257120113'
        )
        .reply(200, {
            response: {
                numFound: 1,
                start: 0,
                maxScore: 15.826545,
                docs: [
                    {
                        woonplaatsnaam: 'Amsterdam',
                        huis_nlt: '4M',
                        weergavenaam: 'Jonge Roelensteeg 4M, 1012PL Amsterdam',
                        id: 'adr-95a6647a023cda2d8700b1211b1a063a',
                        postcode: '1012PL',
                        centroide_ll: 'POINT(4.89148701 52.37221689)',
                        straatnaam: 'Jonge Roelensteeg'
                    }
                ]
            }
        });
};
