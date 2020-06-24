import React from 'react';
import styled from 'styled-components';

import { Button, Heading } from '@datapunt/asc-ui';

const H1 = styled(Button)`
    margin-bottom: 20px;
    background-color: red;
`;

const Homepage: React.FC<unknown> = () => (
    <>
        <H1>Homepage</H1>
        <Button color="primary">Click me!</Button>
    </>
);

export default Homepage;
