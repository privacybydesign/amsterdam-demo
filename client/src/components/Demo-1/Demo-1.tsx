import React, { useState } from 'react';
import styled from 'styled-components';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';

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

const StyledH2 = styled(Heading).attrs({ as: 'h2' });

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

      {!hasResult && <Alert level="attention" heading={content.demo1.demo.heading} content={content.demo1.demo.content} />}

      {hasResult && isOver18 && <StyledAlert heading={content.demo1.isOver18.heading} content={content.demo1.isOver18.content} />}
      {hasResult && !isOver18 && <Alert level="error" heading={content.demo1.isNotOver18.heading} content={content.demo1.isNotOver18.content} />}

      <ReactMarkDown source={content.demo1.title[hasResult ? 'hasResult' : 'noResult']} renderers={{ heading: StyledH1 }} />

      <img src="/assets/demo_1.png" ></img>

      {!hasResult ?
        <>
          <ReactMarkDown source={content.demo1.intro1} />

          <ReactMarkDown source={content.demo1.tryIt} renderers={{ heading: StyledH2 }} />

          <ReactMarkDown source={content.demo1.intro2} />

          <Accordion title={content.demo1.waarom.title}>
            <ReactMarkDown source={content.demo1.waarom.body} />
          </Accordion>

          <div><ReactMarkDown source={content.demo1.irma.question} /></div>
          <Link href={content.demo1.irma.href} variant="inline" icon={<Icon size={16}> <ExternalLink /> </Icon>}>
            <ReactMarkDown source={content.demo1.irma.label} />
          </Link>

          <QRCode getSession={getSession} />
        </>

        :
        <Result />
      }

    </PageTemplate >
  );
};

export default Demo1;
