import { initialState, reducer } from './reducer';

describe('Demo5 reducer', () => {
    it('should update when action validateForm is dispatched', () => {
        const newState = reducer(initialState, {
            type: 'validateForm',
            payload: {
                location: { id: 'testId', displayName: 'Test' },
                report: 'Test melding',
                optionPhone: true,
                optionEmail: true,
                formErrors: []
            }
        });
        expect(newState).toMatchSnapshot();
    });

    it('should update when action setLocation is dispatched', () => {
        const newState = reducer(initialState, {
            type: 'setLocation',
            payload: { location: { id: 'testId', displayName: 'Test' } }
        });
        expect(newState).toMatchSnapshot();
    });

    it('should update when action setResult is dispatched', () => {
        const newState = reducer(initialState, {
            type: 'setResult',
            payload: { mobilenumber: '0612345678', email: 'test@amsterdam.nl' }
        });
        expect(newState).toMatchSnapshot();
    });

    it('should update when action setError is dispatched', () => {
        const newState = reducer(initialState, { type: 'setError' });
        expect(newState).toMatchSnapshot();
    });

    it('should not update state when an unknown action is dispatched', () => {
        const newState = reducer(initialState, { type: 'unknown' });
        expect(newState).toMatchSnapshot();
    });
});
