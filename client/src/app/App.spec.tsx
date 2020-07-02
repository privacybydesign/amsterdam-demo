import React from 'react';
import App from './App';
import { render } from '@testing-library/react';

describe('App component', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    });
});
