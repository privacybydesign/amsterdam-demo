import React from 'react';
import { Row, Column } from '@datapunt/asc-ui';

interface IProps {}

const PageTemplate: React.FC<IProps> = ({ children }) => (
    <Row>
        <Column span={{ small: 12, medium: 6, big: 6, large: 6, xLarge: 6 }}>
            <div>{children}</div>
        </Column>
    </Row>
);

export default PageTemplate;
