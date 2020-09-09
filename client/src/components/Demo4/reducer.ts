interface IState {
    hasResult?: boolean;
    hasError?: boolean;
    formValid?: boolean;
    owner?: string;
    name?: string;
    street?: string;
    city?: string;
    telephone?: string;
    email?: string;
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
    };
}

export const initialState: IState = {
    hasResult: false,
    hasError: false,
    formValid: true,
    owner: '',
    name: '',
    street: '',
    city: '',
    telephone: '',
    email: ''
};

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case 'validateForm':
            return {
                ...state,
                formValid: true,
                owner: action.payload.owner
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
                name: action.payload.name,
                street: action.payload.street,
                city: action.payload.city,
                telephone: action.payload.telephone,
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
