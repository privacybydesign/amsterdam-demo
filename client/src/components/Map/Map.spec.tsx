import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupMocks, wrappedRender } from '@test/utils';
import Map from '@components/Map/Map';

describe('Map', () => {
    beforeEach(() => {
        // jest.restoreAllMocks();
    });

    it('should render default map with input and no autosuggest visible', async () => {
        const spy = jest.fn();
        await act(async () => await wrappedRender(<Map updateLocationCallback={spy} />));

        expect(screen.queryByTestId('map')).toBeInTheDocument();
        expect(screen.queryByTestId('input')).toBeInTheDocument();
        expect(screen.queryByTestId('autosuggest')).not.toBeInTheDocument();
    });

    it('should show autosuggest when input field has changed', async () => {
        const spy = jest.fn();
        await act(async () => await wrappedRender(<Map updateLocationCallback={spy} />));

        expect(screen.queryByTestId('map')).toBeInTheDocument();
        expect(screen.queryByTestId('input')).toBeInTheDocument();
        expect(screen.queryByTestId('autosuggest')).not.toBeInTheDocument();
    });
});
