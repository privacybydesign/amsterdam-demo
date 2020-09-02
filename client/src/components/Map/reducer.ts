interface IState {
    mapInstance?: any;
    url?: string;
    query?: string;
    autosuggest?: any;
    latLng?: {
        lat: number,
        lng: number
    } | null,
    location?: any;
    showAutosuggest?: boolean;
}

interface IAction {
    type: string;
    payload?: {
        mapInstance?: any;
        url?: string;
        query?: string;
        autosuggest?: any;
        latLng?: any;
        location?: any;
        showAutosuggest?: boolean;
    };
}

export const initialState: IState = {
    mapInstance: {},
    url: '',
    query: '',
    autosuggest: [],
    latLng: null,
    location: {},
    showAutosuggest: false,
};

export const reducer = (state: IState, action: IAction): IState => {
    console.log('reducer', action);
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
                location: action.payload.location,
            };

        case 'setLatLng':
            return {
                ...state,
                latLng: action.payload.latLng,
            };

        case 'setShowAutosuggest':
            return {
                ...state,
                showAutosuggest: action.payload.showAutosuggest,
            };

        case 'setMapInstance':
            return {
                ...state,
                mapInstance: action.payload.mapInstance,
            };

        case 'onChangeLocation':
            return {
                ...state,
                query: action.payload.query,
                url: action.payload.url,
            };


        default:
            return state;
    }
};
