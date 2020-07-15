import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle, ThemeProvider, Header } from '@datapunt/asc-ui';
import AppRoutes from './AppRoutes';

const App: React.FC<unknown> = () => (
    <ThemeProvider>
        <GlobalStyle />
        <Header fullWidth={false} tall homeLink={AppRoutes.HOMEPAGE.path} />
        <Router>
            {Object.keys(AppRoutes).map(key => {
                const { path, component, exact } = AppRoutes[key];
                return <Route key={key} path={path} component={component} exact={exact} />;
            })}
        </Router>
    </ThemeProvider>
);

export default App;
