export interface IState {
    hasResult: boolean;
    hasError: boolean;
    emptyVars: string[];
    formValid: boolean;
    irmaAttributes: {
        owner: string;
        name: string;
        street: string;
        houseNumber: string;
        zipcode: string;
        city: string;
        telephone: string;
        email: string;
    };
}

interface IAction {
    type: string;
    payload?: {
        owner?: string;
        name?: string;
        street?: string;
        houseNumber?: string;
        city?: string;
        zipcode?: string;
        telephone?: string;
        email?: string;
        emptyVar?: string;
    };
}

export const initialState: IState = {
    hasResult: false,
    hasError: false,
    emptyVars: [],
    formValid: true,
    irmaAttributes: {
        owner: '',
        name: '',
        street: '',
        houseNumber: '',
        zipcode: '',
        city: '',
        telephone: '',
        email: ''
    }
};

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case 'validateForm':
            return {
                ...state,
                formValid: true,
                irmaAttributes: {
                    ...state.irmaAttributes,
                    owner: action.payload?.owner as string
                }
            };

        case 'invalidateForm':
            return {
                ...state,
                formValid: false
            };

        case 'setProperties':
            return {
                ...state,
                hasResult: true,
                hasError: false,
                irmaAttributes: {
                    ...state.irmaAttributes,
                    name: action.payload?.name as string,
                    street: action.payload?.street as string,
                    houseNumber: action.payload?.houseNumber as string,
                    zipcode: action.payload?.zipcode as string,
                    city: action.payload?.city as string,
                    telephone: action.payload?.telephone as string,
                    email: action.payload?.email as string
                }
            };

        case 'setError':
            return {
                ...state,
                hasError: true
            };

        case 'setEmptyVars':
            return {
                ...state,
                emptyVars: [...state.emptyVars, action.payload?.emptyVar as string]
            };

        default:
            return state;
    }
};
