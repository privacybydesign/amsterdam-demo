interface IState {
    hasResult?: boolean;
    hasError?: boolean;
    formErrors?: string[];
    location?: string;
    report?: string;
    phoneConsent?: boolean;
    updates?: boolean;
    mobilenumber?: string;
    email?: string;
}

interface IAction {
    type: string;
    payload?: IState;
}

export const initialState: IState = {
    hasResult: false,
    hasError: false,
    formErrors: [],
    location: '',
    report: '',
    phoneConsent: null,
    updates: null,
    mobilenumber: '',
    email: ''
};

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case 'validateForm':
            return {
                ...state,
                location: action.payload.location,
                report: action.payload.report,
                phoneConsent: action.payload.phoneConsent,
                updates: action.payload.updates,
                formErrors: action.payload.formErrors
            };
        case 'setResult':
            return {
                ...state,
                hasResult: true,
                hasError: false,
                mobilenumber: action.payload.mobilenumber,
                email: action.payload.email
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
