import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import createIrmaSession from '@services/createIrmaSession/createIrmaSession';


import { Heading, Button, themeSpacing, Paragraph } from '@datapunt/asc-ui';
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
  const getSession = async () => {
    const response = await createIrmaSession('age', 'irma-qr');
    setIsOver18(response['pbdf.gemeente.personalData.over18'] === 'Yes');

  }

  return (
    <PageTemplate>
      <BreadCrumbs>
        <BreadCrumbs.Item href="/">Home</BreadCrumbs.Item>
      </BreadCrumbs>

      <div>
        <StyledH1>Demo 1</StyledH1>

        <Paragraph>Bent u ouder an 18?</Paragraph>

        <StyledH1>{isOver18 === true ? 'JA' : 'nee'}</StyledH1>

        <QRCode getSession={getSession} />
      </div>
    </PageTemplate>
  );
};

export default Demo1;
