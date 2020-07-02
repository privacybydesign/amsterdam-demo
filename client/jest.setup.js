import 'jest-styled-components';

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
