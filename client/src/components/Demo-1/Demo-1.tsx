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

export interface IProps { };

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
      <ReactMarkDown
        source={content.demo1.breadcrumbs}
        renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
      />

      {!hasResult && <StyledAlert level="attention" heading={content.demo1.demo.heading} content={content.demo1.demo.content} />}

      {hasResult && isOver18 && <GreenAlert heading={content.demo1.isOver18.heading} content={content.demo1.isOver18.content} />}
      {hasResult && !isOver18 && <StyledAlert level="error" heading={content.demo1.isNotOver18.heading} content={content.demo1.isNotOver18.content} />}

      <ReactMarkDown source={content.demo1.title[hasResult ? 'hasResult' : 'noResult']} renderers={{ heading: StyledH1 }} />

      <StyledImage src="/assets/demo_1.png" alt="foto van mensen in een café"></StyledImage>

      {!hasResult ?
        <>
          <ReactMarkDown source={content.demo1.intro1} renderers={{ paragraph: StyledParagraph, list: StyledUL }} />

          <ReactMarkDown source={content.demo1.tryIt} renderers={{ heading: StyledH2 }} />

          <ReactMarkDown source={content.demo1.intro2} renderers={{ paragraph: StyledParagraph, list: StyledUL }} />

          <Accordion title={content.demo1.waarom.title}>
            <ReactMarkDown source={content.demo1.waarom.body} renderers={{ paragraph: StyledParagraph, list: StyledUL }} />
          </Accordion>

          <QRCode getSession={getSession} />

          <div>{content.demo1.irma.question}&nbsp;
            <Link href={content.demo1.irma.href} variant="inline" icon={<Icon size={16}> <ExternalLink /> </Icon>}>
              <ReactMarkDown source={content.demo1.irma.label} />
            </Link>
          </div>
        </>
        :
        <Result />
      }

    </PageTemplate>
  );
};

const StyledH1 = styled(Heading)`
  margin-top: ${themeSpacing(4)};
  margin-bottom: ${themeSpacing(6)};
`;

const StyledH2 = styled.h2`
  margin-top: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(3)};
`;


const StyledAlert = styled(Alert)`
  margin-top: ${themeSpacing(4)};
`;

const GreenAlert = styled(Alert)`
  margin-top: ${themeSpacing(4)};
  background-color: ${themeColor('support', 'valid')};
  * {
    color: ${themeColor('tint', 'level1')};;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(2)};
`;

const StyledUL = styled.ul`
  margin-top: 0;
`;

const StyledImage = styled.img`
    width: 100%;
    margin-bottom: ${themeSpacing(3)};
`;

export default Demo1;
