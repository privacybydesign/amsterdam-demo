import React, { useState, useEffect } from 'react';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion } from '@datapunt/asc-ui';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import HeaderImage, { IHeaderImageProps } from '@components/HeaderImage/HeaderImage';
import QRCode from '@components/QRCode/QRCode';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';

export interface IProps { }
// @todo add error flow with incorrect data

const Demo3: React.FC<IProps> = () => {
  const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [bsn, setBsn] = useState<string>('');
  const [name, setName] = useState<string>('');

  const getSession = async () => {
    const response = await createIrmaSession('demo3', 'irma-qr', credentialSource === CredentialSource.DEMO);
    setHasResult(true);
    setBsn(response['bsn']);
    setName(response['fullname']);

    window.scrollTo(0, 0);
  };

  // Define dynamic header image
  const [headerImg, setHeaderImg] = useState<IHeaderImageProps>({
    filename: content.images.demo3.header.src,
    alt: content.images.demo3.header.alt
  });

  // Update header image for 18+
  useEffect(() => {
    if (hasResult) {
      setHeaderImg({ filename: content.images.demo3.headerResult.src, alt: content.images.demo3.headerResult.alt });
    }
  }, [hasResult]);

  return (
    <PageTemplate>
      <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />

      {bsn} - {name}

      <ReactMarkDown
        source={content.demo3.breadcrumbs}
        renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
      />

      {!hasResult && <DemoNotification />}

      {hasResult && (
        <AscLocal.GreenAlert
          heading={content.demo3.proven.alert.title}
          content={content.demo3.proven.alert.body.replace(/\[\]/, name)}
        />
      )}

      <ReactMarkDown
        source={content.demo3[hasResult ? 'proven' : 'unproven'].title}
        renderers={{ heading: AscLocal.H1 }}
      />

      <HeaderImage filename={headerImg.filename} alt={headerImg.alt} />

      {!hasResult ? (
        <>
          <ReactMarkDown
            source={content.demo3.unproven.intro}
            renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
          />

          <AscLocal.AccordionContainer>
            <Accordion title={content.demo3.unproven.why.title}>
              <ReactMarkDown
                source={content.demo3.unproven.why.body}
                renderers={{ paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
              />
            </Accordion>
          </AscLocal.AccordionContainer>

          <QRCode getSession={getSession} label={content.demo3.button} />

          <ReactMarkDown
            source={content.downloadIrma}
            renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
          />
        </>
      ) : (
          <>
            <ReactMarkDown source={content.demo3.result} renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }} />

            <ReactMarkDown source={content.callToAction} />
          </>
        )}
    </PageTemplate>
  );
};

export default Demo3;
