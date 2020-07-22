import React from 'react';
import styled from 'styled-components';
import { Row, themeSpacing } from '@datapunt/asc-ui';
import VerticalColumn from '@components/VerticalColumn/VerticalColumn';

interface IProps {
    className?: string;
}

const PageTemplate: React.FC<IProps> = ({ children, className }) => (
    <Row className={className}>
        <StyledVerticalColumn span={12}>{children}</StyledVerticalColumn>
    </Row>
);

const StyledVerticalColumn = styled(VerticalColumn)`
    margin: ${themeSpacing(5)} 0;
`;

export default PageTemplate;
