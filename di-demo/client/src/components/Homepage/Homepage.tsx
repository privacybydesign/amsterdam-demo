import React from 'react';
import styled from 'styled-components';

import { Heading, Row, Column, Paragraph } from '@datapunt/asc-ui';
import Article from '../../components/Article';

const StyledImage = styled.img`
    width: 100%;
    margin-bottom: 12px;
`;

const StyledH1 = styled(Heading)`
    margin-top: 16px;
    margin-bottom: 24px;
`;

const StyledH2 = styled(Heading)`
    margin-bottom: 12px;
`;
const Homepage: React.FC<unknown> = () => (
    <>
        <Row hasMaxWidth={false}>
            <Column span={{ small: 12, medium: 6, big: 6, large: 6, xLarge: 6 }}>
                <div>
                    <StyledH1>Probeer IRMA uit</StyledH1>

                    <StyledImage src="/assets/home.png"></StyledImage>

                    <Paragraph strong>
                        IRMA is een app waarmee je overal kunt aantonen wie u bent. IRMA biedt een nieuwe manier van
                        inloggen anders dan u kent van misschien DigiD.
                    </Paragraph>

                    <Paragraph strong>Binnenkort kunt u IRMA gebruiken in Amsterdam. Waarom IRMA?</Paragraph>

                    <Paragraph strong>Ervaar nu vast wat u met IRMA kunt via verschillende demo's.</Paragraph>

                    <StyledH2>Aan de slag met IRMA</StyledH2>

                    <Article imageSrc="/assets/demo_1.png" title="Demo 1: Leeftijd aantonen" href="test1">
                        Bewijs dat u ouder bent dan 18 jaar zonder uw geboortedatum prijs te geven.
                    </Article>

                    <Article imageSrc="/assets/demo_2.png" title="Demo 2: Ideeën voor uw buurt" href="test2">
                        Bewijs dat u in een bepaalde Amsterdamse wijk woont en dat u ouder bent dan 18 jaar.
                    </Article>
                </div>
            </Column>
        </Row>
    </>
);

export default Homepage;
