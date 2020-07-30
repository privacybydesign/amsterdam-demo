import React from 'react';
import styled from 'styled-components';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle, ThemeProvider, Row, themeColor } from '@datapunt/asc-ui';
import theme from '@services/theme';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import Footer from '@components/Footer/Footer';
import AppRoutes from './AppRoutes';
import ScrollToTop from '@components/ScrollToTop/ScrollToTop';

const App: React.FC<unknown> = () => (
    <ThemeProvider overrides={theme}>
        <Bg>
            <GlobalStyle />
            <StyledRow>
                <AscLocal.Header fullWidth={false} tall homeLink={AppRoutes.HOMEPAGE.path} />
            </StyledRow>
            <Router>
                <ScrollToTop />
                {Object.keys(AppRoutes).map(key => {
                    const { path, component, exact } = AppRoutes[key];
                    return <Route key={key} path={path} component={component} exact={exact} />;
                })}
            </Router>
            <Footer />
        </Bg>
    </ThemeProvider>
);

const StyledRow = styled(Row)`
    background-color: ${themeColor('tint', 'level1')};
`;

const Bg = styled.div`
    background-color: ${themeColor('tint', 'level3')};
`;

export default App;
