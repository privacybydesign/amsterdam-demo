import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, ThemeProvider } from "@datapunt/asc-ui";
import '@datapunt/asc-assets/lib/assets/fonts.css';
import * as serviceWorker from "./serviceWorker";
import AppRoutes from "./AppRoutes";

const Main: React.FC = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <div>
          {Object.keys(AppRoutes).map(key => {
            const { path, component } = AppRoutes[key];
            return (
              <Route
                key={key}
                path={path}
                component={component}
                exact={key === "HOME"}
              />
            );
          })}
        </div>
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
