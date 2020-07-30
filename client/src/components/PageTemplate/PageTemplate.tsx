import React from 'react';
import styled from 'styled-components';
import { Row, themeSpacing, themeColor } from '@datapunt/asc-ui';
import VerticalColumn from '@components/VerticalColumn/VerticalColumn';

interface IProps {
    className?: string;
}

const PageTemplate: React.FC<IProps> = ({ children, className }) => (
    <StyledRow className={className}>
        <StyledVerticalColumn span={12}>{children}</StyledVerticalColumn>
    </StyledRow>
);

const StyledVerticalColumn = styled(VerticalColumn)`
    margin: ${themeSpacing(5)} 0;
`;

const StyledRow = styled(Row)`
    background-color: ${themeColor('tint', 'level1')};
`;

export default PageTemplate;
