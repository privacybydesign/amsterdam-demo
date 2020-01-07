import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import MijnAmsterdamPage from "./pages/MijnAmsterdamPage";
import OpenStadPage from "./pages/OpenStadPage";
import HalloIJburgPage from "./pages/HalloIJburgPage";
import AlchoolKopenPage from "./pages/AlchoolKopenPage";
import RommelMeldenPage from "./pages/RommelMeldenPage";
import KortingKrijgenPage from "./pages/KortingKrijgenPage";

const routing = (
  <Router>
    <div>
      <Route path="/" exact component={App} />
      <Route path="/mijnamsterdam" component={MijnAmsterdamPage} />
      <Route path="/openstad" component={OpenStadPage} />
      <Route path="/halloijburg" component={HalloIJburgPage} />
      <Route path="/alchoolkopen" component={AlchoolKopenPage} />
      <Route path="/rommelmelden" component={RommelMeldenPage} />
      <Route path="/kortingkrijgen" component={KortingKrijgenPage} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
