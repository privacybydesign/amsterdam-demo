import { initialState, reducer } from './reducer';

describe('Demo4 reducer', () => {
    it('should update when action validateForm is dispatched', () => {
        const newState = reducer(initialState, { type: 'validateForm', payload: { owner: 'test' } });
        expect(newState).toMatchSnapshot();
    });

    it('should update when action invalidateForm is dispatched', () => {
        const newState = reducer(initialState, { type: 'invalidateForm' });
        expect(newState).toMatchSnapshot();
    });

    it('should update when action setProperties is dispatched', () => {
        const newState = reducer(initialState, {
            type: 'setProperties',
            payload: { name: 'Test test', street: 'Teststraat', city: 'Amsterdam', telephone: '0612345678' }
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
