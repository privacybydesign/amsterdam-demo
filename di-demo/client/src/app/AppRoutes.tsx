import React from 'react';
import Homepage from '../components/Homepage/Homepage';

const Test: React.FC<unknown> = () => <>yo</>;

const AppRoutes: any = {
    HOMEPAGE: { path: '/', component: Homepage },
    TEST_1: { path: '/test1', component: Test }
};

export default AppRoutes;
