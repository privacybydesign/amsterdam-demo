import React from 'react';
import Homepage from '@components/Homepage/Homepage';
import TestIrmaServer from '@components/TestIrmaServer/TestIrmaServer';
import Demo1 from '@components/Demo-1/Demo-1';

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
    DEMO1: { path: '/leeftijd-aantonen', component: Demo1, exact: false },
    TEST_2: { path: '/test2', component: TestIrmaServer, exact: false }
};

export default AppRoutes;
