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

export interface IProps {}
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
        window.scrollTo(0, 0);
    };

    const getSessionOver65 = async () => {
        const response = await createIrmaSession('demo1/65', 'irma-qr', credentialSource === CredentialSource.DEMO);
        setIsOver65(response['over65'] === 'Yes');
        setHasResult65(true);
        window.scrollTo(0, 0);
    };

    // Define dynamic header image
    const [headerImg, setHeaderImg] = useState<IHeaderImageProps>({
        filename: content.images.demo1.header.src,
        alt: content.images.demo1.header.alt
    });

    // Update header image for 18+
    useEffect(() => {
        if (hasResult18) {
            if (isOver18) {
                setHeaderImg({ filename: content.images.demo1.isOver18.src, alt: content.images.demo1.isOver18.alt });
            } else {
                setHeaderImg({
                    filename: content.images.demo1.isNotOver18.src,
                    alt: content.images.demo1.isNotOver18.alt
                });
            }
        }
    }, [hasResult18, isOver18]);

    // Update header image for 65+
    useEffect(() => {
        if (hasResult65) {
            if (isOver65) {
                setHeaderImg({ filename: content.images.demo1.isOver65.src, alt: content.images.demo1.isOver65.alt });
            } else {
                setHeaderImg({
                    filename: content.images.demo1.isNotOver65.src,
                    alt: content.images.demo1.isNotOver65.alt
                });
            }
        }
    }, [hasResult65, isOver65]);

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

            <HeaderImage filename={headerImg.filename} alt={headerImg.alt} />

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
                    <EmphasisBlock>
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
                    </EmphasisBlock>
                    <ReactMarkDown source={content.callToAction} />
                </>
            )}
        </PageTemplate>
    );
};

export default Demo1;
