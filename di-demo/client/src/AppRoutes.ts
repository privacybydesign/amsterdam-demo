import App from "./App";
import MijnAmsterdamPage from "./pages/MijnAmsterdamPage/MijnAmsterdamPage";
import OpenStadPage from "./pages/OpenStadPage/OpenStadPage";
import HalloIJburgPage from "./pages/HalloIJburgPage";
import AlchoolKopenPage from "./pages/AlchoolKopenPage";
import RommelMeldenPage from "./pages/RommelMeldenPage";
import KortingKrijgenPage from "./pages/KortingKrijgenPage";

const AppRoutes: any = {
    HOME: { path: "/", component: App },
    MIJN_AMSTERDAM: {
      path: "/mijnamsterdam/:theme",
      component: MijnAmsterdamPage
    },
    OPEN_STAD: { path: "/openstad/:theme", component: OpenStadPage },
    HALLO_IJBURG: { path: "/halloijburg/:theme", component: HalloIJburgPage },
    ALCHOOL_KOPEN: { path: "/alchoolkopen/:theme", component: AlchoolKopenPage },
    ROMMEL_MELDEN: { path: "/rommelmelden/:theme", component: RommelMeldenPage },
    KORTING_KRIJGEN: {
      path: "/kortingkrijgen/:theme",
      component: KortingKrijgenPage
    }
  };
  
  export default AppRoutes;