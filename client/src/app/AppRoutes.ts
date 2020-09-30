import React from 'react';
import Homepage from '@components/Homepage/Homepage';
import Demo1 from '@components/Demo1/Demo1';
import Demo2 from '@components/Demo2/Demo2';
import Demo3 from '@components/Demo3/Demo3';
import Demo4 from '@components/Demo4/Demo4';
import Demo5 from '@components/Demo5/Demo5';
import Cookies from '@components/Cookies/Cookies';

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
    DEMO2: { path: '/ideeen-voor-uw-buurt', component: Demo2, exact: false },
    DEMO3: { path: '/inloggen-met-irma', component: Demo3, exact: false },
    DEMO4: { path: '/geveltuin-aanvragen', component: Demo4, exact: false },
    DEMO5: { path: '/overlast-melden', component: Demo5, exact: false },
    COOKIES: { path: '/cookies', component: Cookies, exact: false }
};

export default AppRoutes;
