import React, { useState } from 'react';
import styled from 'styled-components';
import createIrmaSession from '@services/createIrmaSession';


import { Heading, Paragraph, Accordion, Link, Icon, Alert, themeColor, themeSpacing } from '@datapunt/asc-ui';
import { ExternalLink } from '@datapunt/asc-assets';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import QRCode from '@components/QRCode/QRCode';
import Result from '@components/Demo-1/Result';

export interface IProps { }

const StyledH1 = styled(Heading)`
  margin-top: ${themeSpacing(4)};
  margin-bottom: ${themeSpacing(6)};
`;

const StyledAlert = styled(Alert)`
  background-color: ${themeColor('support', 'valid')};
  * {
    color: ${themeColor('tint', 'level1')};;
  }
`;

const Demo1: React.FC<IProps> = () => {
  const [isOver18, setIsOver18] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(false);

  const getSession = async () => {
    const response = await createIrmaSession('age', 'irma-qr');
    setIsOver18(response['pbdf.gemeente.personalData.over18'] === 'Yes');
    setHasResult(true);
  }

  return (
    <PageTemplate>
      <BreadCrumbs>
        <BreadCrumbs.Item href="/">Home</BreadCrumbs.Item>
        <BreadCrumbs.Item href="/">Innovatie</BreadCrumbs.Item>
        <BreadCrumbs.Item href="/">Probeer IRMA uit</BreadCrumbs.Item>
      </BreadCrumbs>


      {isOver18 ?
        <StyledAlert heading="Uw leeftijd" content="U heeft bewezen dat u ouder bent dan 18 jaar." />
        :
        <Alert level="attention" heading="Dit is een demosite" content="U kunt hier ervaren wat u met uw IRMA-app kunt. Uw gegevens worden niet bewaard." />
      }

      <StyledH1>Demo 1: {hasResult ? 'Uw leeftijd' : 'Leeftijd aantonen'}</StyledH1>

      <img src="/assets/demo_1.png" ></img>

      {!hasResult ?
        <>
          <Paragraph>Met IRMA kunt u inloggen bij websites zonder eerst een gebruikersnaam en wachtwoord en/of een profiel aan te maken.</Paragraph>

          <Heading as="h2">Probeer het uit</Heading>

          <Paragraph>Login op de demosite van Mijn Amsterdam door uzelf bekend te maken met de volgende gegevens:</Paragraph>

          <ul>
            <li>Uw volledige naam</li>
            <li>Uw burgerservicenummer (BSN)</li>
          </ul>

          <Accordion title="Waarom worden deze gegevens gevraagd?">
            <div>Uw volledige naam</div>
            <Paragraph>De gemeente wil u binnen Mijn Amsterdam graag aanspreken met uw naam.</Paragraph>
            <div>Uw burgerservicenummer (BSN)</div>
            <Paragraph>De gemeente wil zeker weten dat u het bent. Als u dat met IRMA bewijst, toont de gemeente binnen Mijn Amsterdam welke gegevens ze van u heeft vastgelegd en hoe het met uw aanvragen staat.</Paragraph>
          </Accordion>

          <Paragraph>
            <div>Heeft u nog geen IRMA?</div>
            <Link href="/" variant="inline" icon={<Icon size={16}> <ExternalLink /> </Icon>}>
              Download IRMA
            </Link>
          </Paragraph>

          <QRCode getSession={getSession} />
        </>

        :
        <Result />
      }

    </PageTemplate>
  );
};

export default Demo1;
