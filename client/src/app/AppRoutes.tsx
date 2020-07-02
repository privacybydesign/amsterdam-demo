import React from 'react';
import Homepage from '@components/Homepage/Homepage';
import TestIrmaServer from '@components/TestIrmaServer/TestIrmaServer';

interface IRoute {
    path: string;
    exact: boolean;
    component: React.ComponentType<unknown>;
}
interface IAppRoutes {
    [key: string]: IRoute;
}

const AppRoutes: IAppRoutes = {
    HOMEPAGE: { path: '/', component: Homepage, exact: true },
    TEST_1: { path: '/test1', component: TestIrmaServer, exact: false },
    TEST_2: { path: '/test2', component: TestIrmaServer, exact: false }
};

export default AppRoutes;
