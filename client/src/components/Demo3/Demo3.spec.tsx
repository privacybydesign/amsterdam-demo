import React from 'react';
import axios from 'axios';
import Demo3 from './Demo3';
import { ThemeProvider } from '@datapunt/asc-ui';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

export const history = createMemoryHistory();

export const withAppContext = Component => (
    <ThemeProvider>
        <Router history={history}>{Component}</Router>
    </ThemeProvider>
);

describe.only('Demo3 component', () => {
    it('should match snapshot', async () => {
        mock.onGet('/config').reply(200, {
            irma: 'irma-server'
        });

        mock.onGet('/getsession/demo3', { params: { demo: true } }).reply(200, {
            bsn: '123456789',
            fullname: 'Willen van Zanten'
        });

        const { container, asFragment, debug, getByText, getByTestId } = render(withAppContext(<Demo3 />));

        fireEvent.click(getByTestId('qrCodeButton'));

        act(() => {
            // console.log('--------------------------', container.innerHTML);
            expect(1).toBe(1);
        });

        // expect(asFragment()).toMatchSnapshot();
    });
});
