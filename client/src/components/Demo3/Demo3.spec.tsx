import React from 'react';
import axios from 'axios';
import Demo3 from './Demo3';
import { withAppContext } from './../../test/utils';
import { render, fireEvent, act, queryByAltText } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe.only('Demo3 component', () => {
    it('should render correctly in demo demo and result page', async () => {
        mock.onGet('/config').reply(200, {
            irma: 'irma-server'
        });

        mock.onGet('/getsession/demo3?demo=true').reply(200, {
            sessionPtr: {
                u: 'https://acc.attr.auth.amsterdam.nl/irma/session/IikJk1eDBZV9iMb79gR3',
                irmaqr: 'disclosing'
            },
            token: '6aH2xaaLtUKgx3PknxDA'
        });

        // {  bsn: '123456789',
        // fullname: 'Willen van Zanten'
        // });

        // 'https://acc.attr.auth.amsterdam.nl/irma/session/pFqbViPJrkohP2KUR1fZ/status'

        // 'https://acc.attr.auth.amsterdam.nl/session/mfeXW6zqF1gdtpF1hMeX/result'
        // {"token":"mfeXW6zqF1gdtpF1hMeX","status":"DONE","type":"disclosing","proofStatus":"VALID","disclosed":[[{"rawvalue":"J.G. Swart","value":{"":"J.G. Swart","en":"J.G. Swart","nl":"J.G. Swart"},"id":"pbdf.gemeente.personalData.fullname","status":"PRESENT","issuancetime":1591228800},{"rawvalue":"191822668","value":{"":"191822668","en":"191822668","nl":"191822668"},"id":"pbdf.gemeente.personalData.bsn","status":"PRESENT","issuancetime":1591228800}]]}

        // 'https://acc.attr.auth.amsterdam.nl/session/mfeXW6zqF1gdtpF1hMeX/result'
        // {"token":"mfeXW6zqF1gdtpF1hMeX","status":"DONE","type":"disclosing","proofStatus":"VALID","disclosed":[[{"rawvalue":"J.G. Swart","value":{"":"J.G. Swart","en":"J.G. Swart","nl":"J.G. Swart"},"id":"pbdf.gemeente.personalData.fullname","status":"PRESENT","issuancetime":1591228800},{"rawvalue":"191822668","value":{"":"191822668","en":"191822668","nl":"191822668"},"id":"pbdf.gemeente.personalData.bsn","status":"PRESENT","issuancetime":1591228800}]]}

        const { container, asFragment, debug, queryAllByText, getByTestId } = render(withAppContext(<Demo3 />));

        expect(queryAllByText('Demo 3: Inloggen met IRMA').length).toEqual(2);

        // expect(asFragment()).toMatchSnapshot();

        fireEvent.click(getByTestId('qrCodeButton'));

        act(() => {
            expect(queryAllByText('Demo 3: Inloggen met IRMA').length).toEqual(2);
        });
    });
});
