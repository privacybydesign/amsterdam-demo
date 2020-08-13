import React, { useState, useEffect, useRef } from 'react';
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
import { RadioGroup, Label, Radio } from '@datapunt/asc-ui';
import QRCode from '@components/QRCode/QRCode';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';

export interface IProps { }
// @todo add error flow with incorrect data

const Demo4: React.FC<IProps> = () => {
  const formEl = useRef(null);

  const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [isOwner, setIsOwner] = useState<string>('');

  const validateForm = () => {
    const el = formEl.current.querySelector('input[name=geveltuin]:checked');
    if (el) {
      // form was filled in
      const value = el.getAttribute('value');
      setIsOwner(el.getAttribute('value'));
      return true;
    }
    return false;
  };

  const getSession = async () => {
    if (validateForm()) {
      const response = await createIrmaSession('demo4', 'irma-qr', credentialSource === CredentialSource.DEMO);

      setHasResult(true);
      setName(response['fullname']);
      setStreet(`${response['street']} ${response['houseNumber']}`);
      setCity(`${response['zipcode']} ${response['city']}`);
      setTelephone(response['mobilenumber']);

      window.scrollTo(0, 0);

    }
  };

  const [headerImg, setHeaderImg] = useState<IHeaderImageProps>({
    filename: content.images.demo4.header.src,
    alt: content.images.demo4.header.alt
  });

  // Update header image
  useEffect(() => {
    if (hasResult) {
      setHeaderImg({
        filename: content.images.demo4.headerResult.src,
        alt: content.images.demo4.headerResult.alt
      });
    }
  }, [hasResult]);

  return (
    <PageTemplate>
      <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />

      {hasResult} {name} {street} {city} {telephone} {isOwner}

      <ReactMarkDown
        source={content.demo4.breadcrumbs}
        renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
      />

      {!hasResult && <DemoNotification />}

      {hasResult && (
        <AscLocal.Alert
          heading={content.demo4.proven.alert.title}
          content={content.demo4.proven.alert.body}
        />
      )}

      <ReactMarkDown
        source={content.demo4[hasResult ? 'proven' : 'unproven'].title}
        renderers={{ heading: AscLocal.H1 }}
      />

      <HeaderImage filename={headerImg.filename} alt={headerImg.alt} />

      {!hasResult ? (
        <>
          <ReactMarkDown
            source={content.demo4.unproven.intro1}
            renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
          />

          <AscLocal.AccordionContainer>
            <Accordion title={content.demo4.unproven.why.title}>
              <ReactMarkDown
                source={content.demo4.unproven.why.body}
                renderers={{ paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
              />
            </Accordion>
          </AscLocal.AccordionContainer>


          <AscLocal.H2>Demo-aanvraag Geveltuin</AscLocal.H2>
          <form ref={formEl} >
            Bent u eigenaar van de woning waar de geveltuin komt?
            <RadioGroup name="geveltuin">
              <Label htmlFor="yes" label="Ja">
                <Radio id="yes" variant="primary" value="Ja" />
              </Label>
              <Label htmlFor="no" label="Nee">
                <Radio id="no" variant="primary" value="Nee" />
              </Label>
            </RadioGroup>
          </form>

          <ReactMarkDown
            source={content.demo4.unproven.intro2}
            renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
          />

          <QRCode getSession={getSession} label={content.demo4.button} />

          <ReactMarkDown
            source={content.downloadIrma}
            renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
          />
        </>
      ) : (
          <>
            <ReactMarkDown source={content.demo4.result} renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }} />

            <ReactMarkDown source={content.callToAction} />
          </>
        )
      }
    </PageTemplate >
  );
};

export default Demo4;