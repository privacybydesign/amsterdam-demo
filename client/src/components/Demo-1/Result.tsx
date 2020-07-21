import React, { useState } from 'react';

import { Heading, Paragraph, Accordion, Link, Icon, Alert, themeColor, themeSpacing } from '@datapunt/asc-ui';

export interface IProps { }

const Result: React.FC<IProps> = () => {
  return (
    <>
      <Paragraph>De gegevens die u zojuist via IRMA heeft doorgegegeven, worden niet bewaard.</Paragraph>

      <Heading as="h2">Wat heeft u zojuist gedaan?</Heading>

      <ul>
        <li>U heeft IRMA gebruikt om door te geven dat u ouder bent dan 18 jaar.</li>
        <li>U heeft uw geboortedatum (en andere gegevens) niet doorgegeven.</li>
      </ul>

      <Heading as="h2">Wat is er anders met IRMA?</Heading>

          Als u via IRMA uw leeftijd doorgeeft, is bij de website bekend of u aan de leeftijdsgrens voldoet. U blijft anoniem.

      <Paragraph>Dit kan worden gebruikt voor:</Paragraph>

      <ul>
        <li>Alcohol kopen.</li>
        <li>Stemmen voor lokale initiatieven.</li>
        <li>Toegang en korting op basis van uw leeftijd.</li>
      </ul>

      <Link href="" variant="inline">Probeer de andere demo’s</Link>
    </>
  );
};

export default Result;
