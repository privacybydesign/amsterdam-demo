import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle, ThemeProvider, Header } from '@datapunt/asc-ui';
import Footer from '@components/Footer/Footer';
import AppRoutes from './AppRoutes';
import ScrollToTop from '@components/ScrollToTop/ScrollToTop';

const App: React.FC<unknown> = () => (
    <ThemeProvider>
        <GlobalStyle />
        <Header fullWidth={false} tall homeLink={AppRoutes.HOMEPAGE.path} css={{ zIndex: 10 }} />
        <Router>
            <ScrollToTop />
            {Object.keys(AppRoutes).map(key => {
                const { path, component, exact } = AppRoutes[key];
                return <Route key={key} path={path} component={component} exact={exact} />;
            })}
        </Router>
        <Footer />
    </ThemeProvider>
);

export default App;
