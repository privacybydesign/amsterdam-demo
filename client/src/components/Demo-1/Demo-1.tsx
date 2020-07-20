import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import createIrmaSession from '@services/createIrmaSession/createIrmaSession';


import { Heading, Button, themeSpacing, Paragraph, Accordion } from '@datapunt/asc-ui';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import QRCode from '@components/QRCode/QRCode';

export interface IProps { }

const StyledH1 = styled(Heading)`
    margin-top: ${themeSpacing(4)};
    margin-bottom: ${themeSpacing(6)};
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
      </BreadCrumbs>

      <StyledH1>Demo 1: uw leeftijd</StyledH1>

      {!hasResult ?
        <div>

          <Paragraph>Met IRMA kunt u inloggen bij websites zonder eerst een gebruikersnaam en wachtwoord en/of een profiel aan te maken.</Paragraph>

          <Heading as="h2">Probeer het uit</Heading>

          <Paragraph>Login op de demosite van Mijn Amsterdam door uzelf bekend te maken met de volgende gegevens:</Paragraph>

          <ul>
            <li>Uw volledige naam</li>
            <li>Uw burgerservicenummer (BSN)</li>
          </ul>

          <Accordion title="Waarom worden deze gegevens gevraagd?">
            <div >Uw volledige naam</div>
            <div>De gemeente wil u binnen Mijn Amsterdam graag aanspreken met uw naam.</div>
            <div>Uw burgerservicenummer (BSN)</div>
            <div>De gemeente wil zeker weten dat u het bent. Als u dat met IRMA bewijst, toont de gemeente binnen Mijn Amsterdam welke gegevens ze van u heeft vastgelegd en hoe het met uw aanvragen staat.</div>
          </Accordion>

          <div>Heeft u nog geen IRMA?</div>
          <div>Download IRMA</div>

          <QRCode getSession={getSession} />
        </div>

        :
        <div>
          <StyledH1>{isOver18 === true ? 'JA' : 'nee'}</StyledH1>
        </div>
      }

    </PageTemplate>
  );
};

export default Demo1;
