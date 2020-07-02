import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle, ThemeProvider } from '@datapunt/asc-ui';

import AppRoutes from './AppRoutes';

const App: React.FC<unknown> = () => (
    <ThemeProvider>
        <GlobalStyle />
        <Router>
            <div>
                {Object.keys(AppRoutes).map(key => {
                    const { path, component, exact } = AppRoutes[key];
                    return <Route key={key} path={path} component={component} exact={exact} />;
                })}
            </div>
        </Router>
    </ThemeProvider>
);

export default App;
