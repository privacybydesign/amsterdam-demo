import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React, { ReactElement } from 'react';
import { Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { toBeVisible, toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import { render, RenderResult, RenderOptions, cleanup } from '@testing-library/react';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import theme from '@services/theme';
import { ContentProvider } from '@services/ContentProvider';

expect.extend({ toBeVisible, toBeInTheDocument });

export const history = createMemoryHistory();

const providers: React.FC = ({ children }): ReactElement => (
    <ThemeProvider overrides={theme}>
        <ContentProvider>
            <GlobalStyle />
            <Router history={history}>
                <Route path="/">{children}</Route>
            </Router>
        </ContentProvider>
    </ThemeProvider>
);

export const wrappedRender = (ui: ReactElement, options?: RenderOptions): RenderResult =>
    render(ui, { wrapper: providers, ...options });

export const setupMocks = (): void => {
    let mockedAxios: MockAdapter;

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
                numFound: 42,
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
                    }
                ]
            },
            highlighting: {
                'adr-2a8dc1af055da20b8bcdc8e4dbda1eaa': {
                    suggest: ['<b>Dam</b> <b>1</b>, <b>1012JS</b> Amsterdam']
                },
                'adr-8f4d573be765b4c80dd635ba73747903': {
                    suggest: ['<b>Damrak</b> <b>1</b>, <b>1012LG</b> Amsterdam']
                }
            }
        });

    mockedAxios
        .onGet(
            'https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=adr-2a8dc1af055da20b8bcdc8e4dbda1eaa'
        )
        .reply(200, {
            response: {
                numFound: 1,
                start: 0,
                maxScore: 15.73788,
                docs: [
                    {
                        bron: 'BAG',
                        woonplaatscode: '3594',
                        type: 'adres',
                        woonplaatsnaam: 'Amsterdam',
                        wijkcode: 'WK036300',
                        huis_nlt: '1',
                        openbareruimtetype: 'Weg',
                        buurtnaam: 'Oude Kerk e.o.',
                        gemeentecode: '0363',
                        rdf_seealso:
                            'http://bag.basisregistraties.overheid.nl/bag/id/nummeraanduiding/0363200003761447',
                        weergavenaam: 'Dam 1, 1012JS Amsterdam',
                        straatnaam_verkort: 'Dam',
                        id: 'adr-2a8dc1af055da20b8bcdc8e4dbda1eaa',
                        gekoppeld_perceel: ['ASD04-F-6417', 'ASD04-F-7285'],
                        gemeentenaam: 'Amsterdam',
                        buurtcode: 'BU03630001',
                        wijknaam: 'Burgwallen-Oude Zijde',
                        identificatie: '0363010003761571-0363200003761447',
                        openbareruimte_id: '0363300000003186',
                        waterschapsnaam: 'HH Amstel, Gooi en Vecht',
                        provinciecode: 'PV27',
                        postcode: '1012JS',
                        provincienaam: 'Noord-Holland',
                        centroide_ll: 'POINT(4.89371757 52.3732926)',
                        nummeraanduiding_id: '0363200003761447',
                        waterschapscode: '31',
                        adresseerbaarobject_id: '0363010003761571',
                        huisnummer: 1,
                        provincieafkorting: 'NH',
                        centroide_rd: 'POINT(121394 487383)',
                        straatnaam: 'Dam'
                    }
                ]
            }
        });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setupIrmaMocks = (reduceIRMAResult: any, createIrmaSession: any, input: any) => {
    const mockedReduceIRMAResult = reduceIRMAResult as jest.Mock<{ over18: string }>;
    mockedReduceIRMAResult.mockReturnValue(input);

    const mockedCreateIrmaSession = createIrmaSession as jest.Mock<unknown>;
    mockedCreateIrmaSession.mockReturnValue({
        start: () =>
            new Promise(resolve =>
                setTimeout(
                    () =>
                        resolve({
                            disclosed: input
                        }),
                    90
                )
            )
    });
};
