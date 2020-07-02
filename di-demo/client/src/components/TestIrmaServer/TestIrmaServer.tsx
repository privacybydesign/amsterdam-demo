import React, { useEffect } from 'react';
import styled from 'styled-components';
import createIrmaSession from '../../services/createIrmaSession/createIrmaSession';

import { Heading, Row, Column, themeSpacing } from '@datapunt/asc-ui';

const StyledH1 = styled(Heading)`
    margin-top: ${themeSpacing(4)};
    margin-bottom: ${themeSpacing(6)};
`;

const TestIrmaServer: React.FC<unknown> = () => {
    useEffect(() => {
        (async () => {
            const response = await createIrmaSession('age', 'irma-qr');
            console.log('createIrmaSession response', response);
        })();
    }, []);

    return (
        <>
            <Row hasMaxWidth={false}>
                <Column span={{ small: 12, medium: 6, big: 6, large: 6, xLarge: 6 }}>
                    <div>
                        <StyledH1>Test Irma Server</StyledH1>
                    </div>
                </Column>
            </Row>
        </>
    );
};

export default TestIrmaServer;
