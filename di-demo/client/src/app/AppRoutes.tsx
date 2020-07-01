import React from 'react';
import Homepage from '@components/Homepage/Homepage';

const Test: React.FC<unknown> = () => <>TEST STEP</>;

// TODO: Add type
const AppRoutes: unknown = {
    HOMEPAGE: { path: '/', component: Homepage, exact: true },
    TEST_1: { path: '/test1', component: Test, exact: false },
    TEST_2: { path: '/test2', component: Test, exact: false }
};

export default AppRoutes;
