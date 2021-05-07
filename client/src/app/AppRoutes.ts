import Homepage from '@components/Homepage/Homepage';
import Demo1 from '@components/Demo1/Demo1';
import Demo2 from '@components/Demo2/Demo2';
import Demo3 from '@components/Demo3/Demo3';
import Demo4 from '@components/Demo4/Demo4';
import Demo5 from '@components/Demo5/Demo5';
import Cookies from '@components/Cookies/Cookies';
import IESupport from '@components/IESupport/IESupport';
import A11Y from '@components/A11Y/A11Y';
import VotePage from '@pages/Vote';
import NotFound from '@components/NotFound/NotFound';

interface IRoute {
    path: string;
    exact?: boolean;
    component: React.ComponentType<unknown>;
}
interface IAppRoutes {
    [key: string]: IRoute;
}

const AppRoutes: IAppRoutes = {
    HOMEPAGE: { path: '/', component: Homepage, exact: true },
    DEMO1: { path: '/leeftijd-aantonen', component: Demo1 },
    DEMO2: { path: '/ideeen-voor-uw-buurt', component: Demo2 },
    DEMO3: { path: '/inloggen', component: Demo3 },
    DEMO4: { path: '/geveltuin-aanvragen', component: Demo4 },
    DEMO5: { path: '/overlast-melden', component: Demo5 },
    COOKIES: { path: '/cookies', component: Cookies },
    IE_SUPPORT: { path: '/ie-support', component: IESupport },
    A11Y: { path: '/toegankelijkheidsverklaring', component: A11Y },
    VOTE: { path: '/openstad-stemmen-met-irma', component: VotePage },
    NO_MATCH: { path: '*', component: NotFound }
};

export default AppRoutes;
