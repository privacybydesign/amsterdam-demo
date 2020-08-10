import React from 'react';
import styled from 'styled-components';
import { Row, themeSpacing, themeColor } from '@datapunt/asc-ui';
import AppRoutes from '@app/AppRoutes';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import VerticalColumn from '@components/VerticalColumn/VerticalColumn';
import Footer from '@components/Footer/Footer';

interface IProps {
    className?: string;
}

const PageTemplate: React.FC<IProps> = ({ children, className }) => (
    <StyledRow className={className}>
        <AscLocal.Header fullWidth={false} tall homeLink={AppRoutes.HOMEPAGE.path} />
        <StyledVerticalColumn span={12}>{children}</StyledVerticalColumn>
        <Footer />
    </StyledRow>
);

const StyledVerticalColumn = styled(VerticalColumn)`
    margin: ${themeSpacing(5)} 0;
`;

const StyledRow = styled(Row)`
    background-color: ${themeColor('tint', 'level1')};
    flex-direction: column;
    overflow-x: hidden;
`;

export default PageTemplate;
