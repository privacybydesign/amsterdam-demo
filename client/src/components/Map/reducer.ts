import { LatLngLiteral, Map } from 'leaflet';

interface IState {
    mapInstance?: Map | null;
    url?: string;
    query?: string;
    autosuggest?: ILocation[] | null;
    latLng?: LatLngLiteral | null;
    location?: ILocation | null;
    showAutosuggest?: boolean;
}

export interface ILocation {
    id?: string;
    displayName: string;
    latLng?: LatLngLiteral;
}

interface IAction {
    type: string;
    payload?: {
        mapInstance?: Map | null;
        url?: string;
        query?: string;
        autosuggest?: ILocation[] | null;
        location?: ILocation | null;
        showAutosuggest?: boolean;
    };
}

export const initialState: IState = {
    mapInstance: null,
    url: '',
    query: '',
    autosuggest: null,
    location: null,
    showAutosuggest: false
};

export const reducer = (state: IState = initialState, action: IAction): IState => {
    switch (action.type) {
        case 'setAutosuggest':
            return {
                ...state,
                autosuggest: (action.payload as any).autosuggest,
                showAutosuggest: true
            };

        case 'setLocation':
            return {
                ...state,
                location: (action.payload as any).location
            };

        case 'hideAutosuggest':
            return {
                ...state,
                showAutosuggest: false
            };

        case 'setMapInstance':
            return {
                ...state,
                mapInstance: (action.payload as any).mapInstance
            };

        case 'onChangeLocation':
            return {
                ...state,
                query: (action.payload as any).query,
                url: (action.payload as any).url
            };
        default:
            return state;
    }
};
