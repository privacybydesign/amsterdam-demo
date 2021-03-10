import { Map } from 'leaflet';
import { initialState, reducer, ILocation } from './reducer';

interface MockMap extends Map {
    flyTo: jest.Mock;
}

describe('map reducer', () => {
    it('should set default state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should setAutosuggest', () => {
        const mockAutosuggest: ILocation[] = [{ id: '1', displayName: '1' }, { id: '2', displayName: '2' }];
        expect(
            reducer(undefined, {
                type: 'setAutosuggest',
                payload: {
                    autosuggest: mockAutosuggest
                }
            })
        ).toMatchObject({
            autosuggest: mockAutosuggest
        });
    });

    it('should setLocation', () => {
        const mockLocation: ILocation = { id: '1', displayName: 'Test' };
        expect(
            reducer(undefined, {
                type: 'setLocation',
                payload: {
                    location: mockLocation
                }
            })
        ).toMatchObject({
            location: mockLocation
        });
    });

    it('should hideAutosuggest', () => {
        expect(
            reducer(undefined, {
                type: 'hideAutosuggest'
            })
        ).toMatchObject({
            showAutosuggest: false
        });
    });

    it('should setMapInstance', () => {
        const mockMapInstance: MockMap = { flyTo: jest.fn() } as MockMap;
        expect(
            reducer(undefined, {
                type: 'setMapInstance',
                payload: {
                    mapInstance: mockMapInstance
                }
            })
        ).toMatchObject({
            mapInstance: mockMapInstance
        });
    });

    it('onChangeLocation should query and url', () => {
        const mockQuery = 'dam';
        const mockUrl = 'https://url.to/location';
        expect(
            reducer(undefined, {
                type: 'onChangeLocation',
                payload: {
                    query: mockQuery,
                    url: mockUrl
                }
            })
        ).toMatchObject({
            query: mockQuery,
            url: mockUrl
        });
    });
});
