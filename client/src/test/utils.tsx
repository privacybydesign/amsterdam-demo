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

    mockedAxios
        .onGet(
            'https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=gemeentenaam:amsterdam&fq=type:adres&fl=id,weergavenaam,type,score,lat,lon&q=Dam%201'
        )
        .reply(200, {
            response: {
                numFound: 347,
                start: 0,
                maxScore: 13.922994,
                docs: [
                    {
                        type: 'adres',
                        weergavenaam: 'Dam 1, 1012JS Amsterdam',
                        id: 'adr-2a8dc1af055da20b8bcdc8e4dbda1eaa',
                        score: 13.922994
                    },
                    {
                        type: 'adres',
                        weergavenaam: 'Damrak 1, 1012LG Amsterdam',
                        id: 'adr-8f4d573be765b4c80dd635ba73747903',
                        score: 10.875747
                    },
                    {
                        type: 'adres',
                        weergavenaam: 'Damraksteeg 1, 1012LP Amsterdam',
                        id: 'adr-bd7761c205487bb4a624038619e2ec8b',
                        score: 10.875747
                    },
                    {
                        type: 'adres',
                        weergavenaam: 'Dam 10, 1012NP Amsterdam',
                        id: 'adr-3b94f8fe4f9dc8dc3d2db695487d207c',
                        score: 9.879723
                    },
                    {
                        type: 'adres',
                        weergavenaam: 'Dam 11, 1012JS Amsterdam',
                        id: 'adr-41cba7eb1a70b9fd144b8a3419b86271',
                        score: 9.879723
                    },
                    {
                        type: 'adres',
                        weergavenaam: 'Dam 12, 1012NP Amsterdam',
                        id: 'adr-07149cd8cb4fd4c800546c4182b2769d',
                        score: 9.879723
                    },
                    {
                        type: 'adres',
                        weergavenaam: 'Dam 13, 1012JS Amsterdam',
                        id: 'adr-0268a052aad3b89a81b64fa084c547a0',
                        score: 9.879723
                    },
                    {
                        type: 'adres',
                        weergavenaam: 'Dam 15, 1012JS Amsterdam',
                        id: 'adr-83c70251c1a67123c9279c0ba3e39ded',
                        score: 9.879723
                    },
                    {
                        type: 'adres',
                        weergavenaam: 'Dam 16, 1012NP Amsterdam',
                        id: 'adr-82325b642ba34164aa050caa801732b2',
                        score: 9.879723
                    },
                    {
                        type: 'adres',
                        weergavenaam: 'Dam 17, 1012JS Amsterdam',
                        id: 'adr-5668dc45640b2dbf0c01eb0370be455a',
                        score: 9.879723
                    }
                ]
            },
            highlighting: {
                'adr-2a8dc1af055da20b8bcdc8e4dbda1eaa': {
                    suggest: ['<b>Dam</b> <b>1</b>, <b>1012JS</b> Amsterdam']
                },
                'adr-8f4d573be765b4c80dd635ba73747903': {
                    suggest: ['<b>Damrak</b> <b>1</b>, <b>1012LG</b> Amsterdam']
                },
                'adr-bd7761c205487bb4a624038619e2ec8b': {
                    suggest: ['<b>Damraksteeg</b> <b>1</b>, <b>1012LP</b> Amsterdam']
                },
                'adr-3b94f8fe4f9dc8dc3d2db695487d207c': {
                    suggest: ['<b>Dam</b> <b>10</b>, <b>1012NP</b> Amsterdam']
                },
                'adr-41cba7eb1a70b9fd144b8a3419b86271': {
                    suggest: ['<b>Dam</b> <b>11</b>, <b>1012JS</b> Amsterdam']
                },
                'adr-07149cd8cb4fd4c800546c4182b2769d': {
                    suggest: ['<b>Dam</b> <b>12</b>, <b>1012NP</b> Amsterdam']
                },
                'adr-0268a052aad3b89a81b64fa084c547a0': {
                    suggest: ['<b>Dam</b> <b>13</b>, <b>1012JS</b> Amsterdam']
                },
                'adr-83c70251c1a67123c9279c0ba3e39ded': {
                    suggest: ['<b>Dam</b> <b>15</b>, <b>1012JS</b> Amsterdam']
                },
                'adr-82325b642ba34164aa050caa801732b2': {
                    suggest: ['<b>Dam</b> <b>16</b>, <b>1012NP</b> Amsterdam']
                },
                'adr-5668dc45640b2dbf0c01eb0370be455a': {
                    suggest: ['<b>Dam</b> <b>17</b>, <b>1012JS</b> Amsterdam']
                }
            },
            spellcheck: {
                suggestions: [],
                collations: []
            }
        });
};
