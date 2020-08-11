import React, { useState, useEffect } from 'react';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion } from '@datapunt/asc-ui';
import { Alert as AlertIcon } from '@datapunt/asc-assets';
import { Checkmark } from '@datapunt/asc-assets';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import HeaderImage, { IHeaderImageProps } from '@components/HeaderImage/HeaderImage';
import QRCode from '@components/QRCode/QRCode';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import WhyIRMA from '@components/WhyIRMA/WhyIRMA';

export interface IProps {}

const Demo1: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.DEMO);
    const [isOver18, setIsOver18] = useState<boolean>(false);
    const [hasResult18, setHasResult18] = useState<boolean>(false);
    const [isOver65, setIsOver65] = useState<boolean>(false);
    const [hasResult65, setHasResult65] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const getSessionOver18 = async (): Promise<null | unknown> => {
        const response = await createIrmaSession('demo1/18', 'irma-qr', credentialSource === CredentialSource.DEMO);
        if (response) {
            setIsOver18(response['over18'] === 'Yes');
            setHasResult18(true);
            setHasError(false);
        } else {
            setHasError(true);
        }

        window.scrollTo(0, 0);
        return response;
    };

    const getSessionOver65 = async (): Promise<null | unknown> => {
        const response = await createIrmaSession('demo1/65', 'irma-qr', credentialSource === CredentialSource.DEMO);
        if (response) {
            setIsOver65(response['over65'] === 'Yes');
            setHasResult65(true);
            setHasError(false);
        } else {
            setHasError(true);
        }

        window.scrollTo(0, 0);
        return response;
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
            <ContentBlock>
                <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />
                {!hasResult18 && !hasResult65 && <DemoNotification />}
                <ReactMarkDown
                    source={content.demo1.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />
                <ReactMarkDown
                    source={content.demo1.title[hasResult18 || hasResult65 ? 'hasResult' : 'noResult']}
                    renderers={{ heading: AscLocal.H1 }}
                />

                {hasResult18 && isOver18 && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.SUCCESS}
                        icon={<Checkmark />}
                        heading={content.demo1.isOver18.heading}
                        content={content.demo1.isOver18.content}
                    />
                )}
                {hasResult18 && !isOver18 && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<AlertIcon />}
                        heading={content.demo1.isNotOver18.heading}
                        content={content.demo1.isNotOver18.content}
                    />
                )}

                {hasResult65 && isOver65 && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.SUCCESS}
                        icon={<Checkmark />}
                        heading={content.demo1.isOver65.heading}
                        content={content.demo1.isOver65.content}
                    />
                )}
                {hasResult65 && !isOver65 && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<AlertIcon />}
                        heading={content.demo1.isNotOver65.heading}
                        content={content.demo1.isNotOver65.content}
                    />
                )}
                {hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<AlertIcon />}
                        heading={content.demoErrorAlert.heading}
                        content={content.demoErrorAlert.content}
                    />
                )}
            </ContentBlock>

            <HeaderImage filename={headerImg.filename} alt={headerImg.alt} />

            {!hasResult18 && !hasResult65 ? (
                <ContentBlock>
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
                </ContentBlock>
            ) : (
                <AscLocal.Row>
                    <AscLocal.Column span={{ small: 1, medium: 2, big: 6, large: 9, xLarge: 9 }}>
                        <ContentBlock>
                            <ReactMarkDown source={content.noSavePromise} />
                            <EmphasisBlock>
                                <ReactMarkDown source={content.demo1.result.title} />
                                {/* // TODO: Refactor renderers */}
                                {hasResult18 && isOver18 && (
                                    <ReactMarkDown
                                        source={content.demo1.result.isOver18}
                                        renderers={{
                                            heading: AscLocal.H2,
                                            paragraph: AscLocal.Paragraph,
                                            list: AscLocal.UL
                                        }}
                                    />
                                )}
                                {hasResult18 && !isOver18 && (
                                    <ReactMarkDown
                                        source={content.demo1.result.isNotOver18}
                                        renderers={{
                                            heading: AscLocal.H2,
                                            paragraph: AscLocal.Paragraph,
                                            list: AscLocal.UL
                                        }}
                                    />
                                )}
                                {hasResult65 && isOver65 && (
                                    <ReactMarkDown
                                        source={content.demo1.result.isOver65}
                                        renderers={{
                                            heading: AscLocal.H2,
                                            paragraph: AscLocal.Paragraph,
                                            list: AscLocal.UL
                                        }}
                                    />
                                )}
                                {hasResult65 && !isOver65 && (
                                    <ReactMarkDown
                                        source={content.demo1.result.isNotOver65}
                                        renderers={{
                                            heading: AscLocal.H2,
                                            paragraph: AscLocal.Paragraph,
                                            list: AscLocal.UL
                                        }}
                                    />
                                )}
                                <ReactMarkDown
                                    source={content.demo1.result.whatsDifferentWithIrma}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        paragraph: AscLocal.Paragraph,
                                        list: AscLocal.UL
                                    }}
                                />
                            </EmphasisBlock>
                            <ReactMarkDown
                                source={content.callToAction}
                                renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                            />
                        </ContentBlock>
                    </AscLocal.Column>
                    <AscLocal.Column span={{ small: 1, medium: 2, big: 6, large: 3, xLarge: 3 }}>
                        <WhyIRMA />
                    </AscLocal.Column>
                </AscLocal.Row>
            )}
        </PageTemplate>
    );
};

export default Demo1;
