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
import QRCode from '@components/QRCode/QRCode';

export interface IProps {}

interface IHeaderImage {
    filename: string;
    alt: string;
}
// @todo add error flow with incorrect data

const Demo1: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [isOver18, setIsOver18] = useState<boolean>(false);
    const [hasResult18, setHasResult18] = useState<boolean>(false);
    const [isOver65, setIsOver65] = useState<boolean>(false);
    const [hasResult65, setHasResult65] = useState<boolean>(false);

    const getSessionOver18 = async () => {
        const response = await createIrmaSession('demo1/18', 'irma-qr', credentialSource === CredentialSource.DEMO);
        setIsOver18(response['over18'] === 'Yes');
        setHasResult18(true);
    };

    const getSessionOver65 = async () => {
        const response = await createIrmaSession('demo1/65', 'irma-qr', credentialSource === CredentialSource.DEMO);
        setIsOver65(response['over65'] === 'Yes');
        setHasResult65(true);
    };

    // Define dynamic header image
    const [headerImg, setHeaderImg] = useState<IHeaderImage>({
        filename: 'leeftijd',
        alt: 'Stadsbeeld van een terras'
    });

    useEffect(() => {
        // Update header image
        if (hasResult) {
            if (isOver18) {
                setHeaderImg({ filename: 'ouder-dan-18', alt: 'Foto van mensen in een café' });
            }
        }
    }, [hasResult, isOver18]);

    return (
        <PageTemplate>
            <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />

            <ReactMarkDown
                source={content.demo1.breadcrumbs}
                renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
            />

            {!hasResult18 && !hasResult65 && <DemoNotification />}

            {hasResult18 && isOver18 && (
                <AscLocal.GreenAlert
                    heading={content.demo1.isOver18.heading}
                    content={content.demo1.isOver18.content}
                />
            )}
            {hasResult18 && !isOver18 && (
                <AscLocal.RedAlert
                    heading={content.demo1.isNotOver18.heading}
                    content={content.demo1.isNotOver18.content}
                />
            )}

            {hasResult65 && isOver65 && (
                <AscLocal.GreenAlert
                    heading={content.demo1.isOver65.heading}
                    content={content.demo1.isOver65.content}
                />
            )}
            {hasResult65 && !isOver65 && (
                <AscLocal.RedAlert
                    heading={content.demo1.isNotOver65.heading}
                    content={content.demo1.isNotOver65.content}
                />
            )}

            <ReactMarkDown
                source={content.demo1.title[hasResult18 || hasResult65 ? 'hasResult' : 'noResult']}
                renderers={{ heading: AscLocal.H1 }}
            />

            {/* // TODO: Refactor this responsive image */}
            <AscLocal.Image
                src={`/assets/${headerImg.filename}-940.jpg`}
                srcSet={`/assets/${headerImg.filename}-290.jpg 580w, /assets/${headerImg.filename}-940.jpg 1880w`}
                alt={headerImg.alt}
            />

            {!hasResult18 && !hasResult65 ? (
                <>
                    <ReactMarkDown
                        source={content.demo1.intro}
                        renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                    />

                    <AscLocal.AccordionContainer>
                        <Accordion title={content.demo1.why.title}>
                            <ReactMarkDown
                                source={content.demo1.why.body}
                                renderers={{ paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                            />
                        </Accordion>
                    </AscLocal.AccordionContainer>

                    <div>
                        <QRCode getSession={getSessionOver18} label={content.demo1.button18} />
                        <QRCode getSession={getSessionOver65} label={content.demo1.button65} />
                    </div>

                    <ReactMarkDown
                        source={content.downloadIrma}
                        renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
                    />
                </>
            ) : (
                <>
                    <ReactMarkDown source={content.noSavePromise} />
                    <ReactMarkDown source={content.demo1.result.title} />
                    {/* // TODO: Refactor renderers */}
                    {hasResult18 && isOver18 && (
                        <ReactMarkDown
                            source={content.demo1.result.isOver18}
                            renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                        />
                    )}
                    {hasResult18 && !isOver18 && (
                        <ReactMarkDown
                            source={content.demo1.result.isNotOver18}
                            renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                        />
                    )}
                    {hasResult65 && isOver65 && (
                        <ReactMarkDown
                            source={content.demo1.result.isOver65}
                            renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                        />
                    )}
                    {hasResult65 && !isOver65 && (
                        <ReactMarkDown
                            source={content.demo1.result.isNotOver65}
                            renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                        />
                    )}
                    <ReactMarkDown source={content.demo1.result.whatsDifferentWithIrma} />
                    <ReactMarkDown source={content.callToAction} />
                </>
            )}
        </PageTemplate>
    );
};

export default Demo1;
