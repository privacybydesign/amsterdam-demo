import React from 'react';

import { Button, Heading, themeSpacing } from '@datapunt/asc-ui';

// const H1 = styled(Heading)`
//     margin-bottom: 20px;
// `;

const Homepage: React.FC<unknown> = () => (
    <div>
        <Heading>Homepage</Heading>
        <Button color="primary">Click me!</Button>
    </div>
);

export default Homepage;
