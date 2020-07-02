import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import createIrmaSession from '@services/createIrmaSession/createIrmaSession';

import { Heading, Row, Column, themeSpacing, Paragraph } from '@datapunt/asc-ui';

const StyledH1 = styled(Heading)`
    margin-top: ${themeSpacing(4)};
    margin-bottom: ${themeSpacing(6)};
`;

const TestIrmaServer: React.FC<unknown> = () => {
    const [isOver18, setOver18] = useState('');

    useEffect(() => {
        (async () => {
            const response = await createIrmaSession('age', 'irma-qr');
            console.log('response', response);
            setOver18(response['pbdf.gemeente.personalData.over18']);
        })();
    }, []);

    return (
        <>
            <Row hasMaxWidth={false}>
                <Column span={{ small: 12, medium: 6, big: 6, large: 6, xLarge: 6 }}>
                    <div>
                        <StyledH1>Test Irma Server</StyledH1>

                        <Paragraph>Bent u ouder an 18?</Paragraph>

                        <StyledH1>{isOver18}</StyledH1>

                        <div id="irma-qr"></div>
                    </div>
                </Column>
            </Row>
        </>
    );
};

export default TestIrmaServer;
