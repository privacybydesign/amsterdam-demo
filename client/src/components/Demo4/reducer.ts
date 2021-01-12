interface IState {
    hasResult: boolean;
    hasError: boolean;
    hasEmptyVars: boolean;
    emptyVars: string[];
    formValid: boolean;
    irmaAttributes: {
        owner: string;
        name: string;
        street: string;
        city: string;
        telephone: string;
        email: string;
    }
}

interface IAction {
    type: string;
    payload?: {
        owner?: string;
        name?: string;
        street?: string;
        city?: string;
        telephone?: string;
        email?: string;
        emptyVar?: string;
    };
}

export const initialState: IState = {
    hasResult: false,
    hasError: false,
    hasEmptyVars: false,
    emptyVars: [],
    formValid: true,
    irmaAttributes: {
        owner: '',
        name: '',
        street: '',
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
                    owner: action.payload.owner
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
                    name: action.payload['name'],
                    street: action.payload['street'],
                    city: action.payload['city'],
                    telephone: action.payload['telephone'],
                    email: action.payload['email']
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
                hasEmptyVars: true,
                emptyVars: [
                    ...state.emptyVars,
                    action.payload['emptyVar']
                ]
            }

        default:
            return state;
    }
};
