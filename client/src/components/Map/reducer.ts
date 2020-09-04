import { LatLngLiteral, Map } from 'leaflet';

interface IState {
    mapInstance?: Map | null;
    url?: string;
    query?: string;
    autosuggest?: [Location];
    latLng?: LatLngLiteral | null;
    location?: [Location] | null;
    showAutosuggest?: boolean;
}

interface IAction {
    type: string;
    payload?: {
        mapInstance?: Map | null;
        url?: string;
        query?: string;
        autosuggest?: [Location] | null;
        latLng?: LatLngLiteral | null;
        location?: [Location] | null;
        showAutosuggest?: boolean;
    };
}

export interface Location {
    id?: string;
    weergavenaam?: string;
}

export const initialState: IState = {
    mapInstance: null,
    url: '',
    query: '',
    autosuggest: null,
    latLng: null,
    location: null,
    showAutosuggest: false
};

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case 'setAutosuggest':
            return {
                ...state,
                autosuggest: action.payload.autosuggest,
                showAutosuggest: true
            };

        case 'setLocation':
            return {
                ...state,
                location: action.payload.location
            };

        case 'setLatLng':
            return {
                ...state,
                latLng: action.payload.latLng
            };

        case 'hideAutosuggest':
            return {
                ...state,
                showAutosuggest: false
            };

        case 'setMapInstance':
            return {
                ...state,
                mapInstance: action.payload.mapInstance
            };

        case 'onChangeLocation':
            return {
                ...state,
                query: action.payload.query,
                url: action.payload.url
            };
        default:
            return state;
    }
};
