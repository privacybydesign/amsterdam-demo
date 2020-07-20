import React from 'react';
import { Row } from '@datapunt/asc-ui';
import VerticalColumn from '@components/VerticalColumn/VerticalColumn';

interface IProps {}

const PageTemplate: React.FC<IProps> = ({ children }) => (
    <Row>
        <VerticalColumn span={12}>{children}</VerticalColumn>
    </Row>
);

export default PageTemplate;
