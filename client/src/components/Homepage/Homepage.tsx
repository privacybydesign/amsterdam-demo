import React from 'react';
import styled from 'styled-components';
import BreadCrumbs from '@components/BreadCrumbs';
import { Accordion, Heading, Paragraph, themeSpacing } from '@datapunt/asc-ui';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import Article from '@components/Article/Article';

interface IProps {}

const Homepage: React.FC<IProps> = () => (
    <PageTemplate>
        <BreadCrumbs>
            <BreadCrumbs.Item href="/">Home</BreadCrumbs.Item>
        </BreadCrumbs>
        <StyledH1>Probeer IRMA uit</StyledH1>

        <StyledImage src="/assets/home.png"></StyledImage>

        <Paragraph strong>
            IRMA is een app waarmee je overal kunt aantonen wie u bent. IRMA biedt een nieuwe manier van inloggen anders
            dan u kent van misschien DigiD.
        </Paragraph>

        <Paragraph strong>Binnenkort kunt u IRMA gebruiken in Amsterdam. Waarom IRMA?</Paragraph>

        <Paragraph strong>Ervaar nu vast wat u met IRMA kunt via verschillende demo&apos;s.</Paragraph>

        <StyledAccorion title="Wat heeft u nodig?" id="nodig">
            U kunt de demo&apos;s met IRMA doen als u de IRMA-app op uw telefoon heeft geïnstalleerd en als u de IRMA de
            volgende gegevens heeft toegevoegd:
            <ul>
                <li>Uw persoonsgegevens</li>
                <li>Uw adres</li>
                <li>Uw e-mailadres</li>
                <li>Uw telefoonnummer</li>
            </ul>
        </StyledAccorion>

        <StyledH2>Aan de slag met IRMA</StyledH2>

        <Article imageSrc="/assets/demo_1.png" title="Demo 1: Leeftijd aantonen" href="test1">
            Bewijs dat u ouder bent dan 18 jaar zonder uw geboortedatum prijs te geven.
        </Article>

        <Article imageSrc="/assets/demo_2.png" title="Demo 2: Ideeën voor uw buurt" href="test2">
            Bewijs dat u in een bepaalde Amsterdamse wijk woont en dat u ouder bent dan 18 jaar.
        </Article>
    </PageTemplate>
);

const StyledImage = styled.img`
    width: 100%;
    margin-bottom: ${themeSpacing(3)};
`;

const StyledH1 = styled(Heading)`
    margin-top: ${themeSpacing(4)};
    margin-bottom: ${themeSpacing(6)};
`;

const StyledH2 = styled(Heading)`
    margin-bottom: ${themeSpacing(3)};
`;

const StyledAccorion = styled(Accordion)`
    margin-bottom: ${themeSpacing(5)};
`;

export default Homepage;
