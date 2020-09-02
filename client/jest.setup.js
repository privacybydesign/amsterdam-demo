import 'jest-styled-components';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

// Mock window.scrollTo (fixes jsdom issue)
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
});

// Mock react-router-hooks because they fail
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({}),
    useRouteMatch: () => ({ url: '/' }),
    useLocation: () => ({
        pathname: '/',
        hash: '',
        search: '',
        state: ''
    })
}));
