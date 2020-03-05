import App from './App';
import MijnStadPage from './pages/MijnStadPage/MijnStadPage';
import OpenStadPage from './pages/OpenStadPage/OpenStadPage';
import AlcoholKopenPage from './pages/AlcoholKopenPage';
import AfvalMeldenPage from './pages/AfvalMeldenPage';

const AppRoutes: any = {
  HOME: { path: '/', component: App },
  MIJN_STAD: {
    path: '/mijnstad/:theme',
    component: MijnStadPage,
  },
  OPEN_STAD: { path: '/openstad/:theme', component: OpenStadPage },
  AFVAL_MELDEN: { path: '/afvalmelden/:theme', component: AfvalMeldenPage },
  ALCOHOL_KOPEN: { path: '/alcoholkopen/:theme', component: AlcoholKopenPage },
};

export default AppRoutes;
