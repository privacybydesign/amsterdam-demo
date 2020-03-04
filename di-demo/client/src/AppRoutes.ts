import App from './App';
import MijnAmsterdamPage from './pages/MijnAmsterdamPage/MijnAmsterdamPage';
import OpenStadPage from './pages/OpenStadPage/OpenStadPage';
import AlcoholKopenPage from './pages/AlcoholKopenPage';
import AfvalMeldenPage from './pages/AfvalMeldenPage';

const AppRoutes: any = {
  HOME: { path: '/', component: App },
  MIJN_AMSTERDAM: {
    path: '/mijnamsterdam/:theme',
    component: MijnAmsterdamPage,
  },
  OPEN_STAD: { path: '/openstad/:theme', component: OpenStadPage },
  AFVAL_MELDEN: { path: '/afvalmelden/:theme', component: AfvalMeldenPage },
  ALCOHOL_KOPEN: { path: '/alcoholkopen/:theme', component: AlcoholKopenPage },
};

export default AppRoutes;
