import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupMocks, wrappedRender } from '@test/utils';
import Map from '@components/Map/Map';

// Setup all the generic mocks
setupMocks();

// MockcreateIrmaSession
jest.mock('@services/createIrmaSession');

describe('Map', () => {
    it('should render default map with input and no autosuggest visible', async () => {
        await act(async (): Promise<any> => await wrappedRender(<Map updateLocationCallback={jest.fn()} />));
        expect(screen.queryByTestId('map')).toMatchSnapshot();
        expect(screen.queryByTestId('input')).toBeInTheDocument();
        expect(screen.queryByTestId('autosugest')).toBeNull();
    });

    it('should show autosuggest when input field has changed', async () => {
        await act(async (): Promise<any> => await wrappedRender(<Map updateLocationCallback={jest.fn()} />));
        await act(async () => {
            await fireEvent.change(screen.queryByTestId('input') as any, { target: { value: 'Dam 1' } });
        });
        expect(screen.getByTestId('autosuggest')).toMatchSnapshot();
    });

    it('should trigger the callback when an autosuggest option is selected', async () => {
        const spy = jest.fn();
        await act(async (): Promise<any> => await wrappedRender(<Map updateLocationCallback={spy} />));
        await act(async () => {
            await fireEvent.change(screen.queryByTestId('input') as any, { target: { value: 'Dam 1' } });
        });

        const autoSuggestOption = screen.getByText('Dam 1, 1012JS Amsterdam');
        await act(async () => {
            await fireEvent.mouseDown(autoSuggestOption);
        });

        expect(spy).toBeCalled();
    });

    it('should trigger the callback when the user clicks on the map', async () => {
        const spy = jest.fn();
        await act(async (): Promise<any> => await wrappedRender(<Map updateLocationCallback={spy} />));

        const map = screen.getByTestId('map');
        await act(async (): Promise<any> => await fireEvent.click(map));

        expect(spy).toBeCalled();
    });
});
