import React from 'react';
import Homepage from '@components/Homepage/Homepage';
import Demo1 from '@components/Demo1/Demo1';
import Demo2 from '@components/Demo2/Demo2';

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
    TEST_2: { path: '/demo-2', component: Demo2, exact: false }
};

export default AppRoutes;
