import { LatLng } from 'leaflet';

export interface IState {
    hasResult?: boolean;
    hasError?: boolean;
    formErrors?: string[];
    location?: ILocation | null;
    report?: string;
    optionPhone?: boolean | null;
    optionEmail?: boolean | null;
    mobilenumber?: string;
    email?: string;
}

interface IAction {
    type: string;
    payload?: IState;
}

interface ILocation {
    id: string;
    displayName: string;
    latLng?: LatLng | null;
}

export const initialState: IState = {
    hasResult: false,
    hasError: false,
    formErrors: [],
    location: null,
    report: '',
    optionPhone: null,
    optionEmail: null,
    mobilenumber: '',
    email: ''
};

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case 'validateForm':
            return {
                ...state,
                location: action.payload?.location,
                report: action.payload?.report,
                optionPhone: action.payload?.optionPhone,
                optionEmail: action.payload?.optionEmail,
                formErrors: action.payload?.formErrors
            };
        case 'setLocation':
            return {
                ...state,
                location: action.payload?.location
            };
        case 'setResult':
            return {
                ...state,
                hasResult: true,
                hasError: false,
                mobilenumber: action.payload?.mobilenumber,
                email: action.payload?.email
            };
        case 'setError':
            return {
                ...state,
                hasError: true
            };
        default:
            return state;
    }
};
