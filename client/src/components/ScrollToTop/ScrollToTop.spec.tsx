import React from 'react';
import { act } from '@testing-library/react';
import { setupMocks, wrappedRender, history } from '@test/utils';
import ScrollToTop from './ScrollToTop';

// Setup all the generic mocks
setupMocks();

describe('ScrollToTop', () => {
    it('should scroll to top when switching routes', async () => {
        window.scrollTo = jest.fn();
        const mockedScrollTo = window.scrollTo as jest.Mock<unknown>;
        // Render ScrollToTop
        act(() => {
            wrappedRender(<ScrollToTop />);
        });
        history.push('/test');
        expect(mockedScrollTo.mock.calls.length).toBe(1);
    });
});
