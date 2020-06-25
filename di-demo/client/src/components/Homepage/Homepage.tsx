import React from 'react';
import styled from 'styled-components';

import { Button, Heading, Row, Column, themeSpacing, themeColor } from '@datapunt/asc-ui';

const H1 = styled(Heading)`
    margin-bottom: ${themeSpacing(25)};
    background-color: ${themeColor('tint', 'level4')};
`;

const Homepage: React.FC<unknown> = () => (
    <>
        <Row hasMaxWidth={false}>
            <Column span={{ small: 12, medium: 6, big: 6, large: 6, xLarge: 6 }}>
                <H1>Homepage</H1>
                <Button color="primary">Click me!</Button>
            </Column>
        </Row>
    </>
);

export default Homepage;
