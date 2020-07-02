import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import createIrmaSession from '@services/createIrmaSession/createIrmaSession';

import { Heading, Row, Column, themeSpacing, Paragraph } from '@datapunt/asc-ui';

export interface Props {}

const StyledH1 = styled(Heading)`
    margin-top: ${themeSpacing(4)};
    margin-bottom: ${themeSpacing(6)};
`;

const TestIrmaServer: React.FC<Props> = () => {
    const [isOver18, setIsOver18] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const response = await createIrmaSession('age', 'irma-qr');
            setIsOver18(response['pbdf.gemeente.personalData.over18'] === 'Yes');
        })();
    }, []);

    return (
        <>
            <Row hasMaxWidth={false}>
                <Column span={{ small: 12, medium: 6, big: 6, large: 6, xLarge: 6 }}>
                    <div>
                        <StyledH1>Test Irma Server</StyledH1>

                        <Paragraph>Bent u ouder an 18?</Paragraph>

                        <StyledH1>{isOver18 === true ? 'JA' : 'nee'}</StyledH1>

                        <canvas id="irma-qr" />
                    </div>
                </Column>
            </Row>
        </>
    );
};

export default TestIrmaServer;
