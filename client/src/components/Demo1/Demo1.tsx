import React, { useState, useEffect } from 'react';
import ReactMarkDown from 'react-markdown';
import { Accordion } from '@amsterdam/asc-ui';
import { Alert as AlertIcon } from '@amsterdam/asc-assets';
import { Checkmark } from '@amsterdam/asc-assets';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
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
import preloadDemoImages from '@services/preloadImages';
import { startSurvey as startUsabillaSurvey } from '@services/usabilla';

export interface IProps {}

const Demo1: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [isOver18, setIsOver18] = useState<boolean>(false);
    const [hasResult18, setHasResult18] = useState<boolean>(false);
    const [isOver65, setIsOver65] = useState<boolean>(false);
    const [hasResult65, setHasResult65] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const getSessionOver18 = async (): Promise<null | unknown> => {
        const response = await createIrmaSession(
            'demo1/18',
            'irma-qr',
            credentialSource === CredentialSource.DEMO && { demo: true }
        );
        if (response) {
            setIsOver18(
                response['over18'] === 'Yes' ||
                    response['over18'] === 'yes' ||
                    response['over18'] === 'Ja' ||
                    response['over18'] === 'ja'
            );
            setHasResult18(true);
            setHasError(false);
        } else {
            setHasError(true);
        }

        window.scrollTo(0, 0);
        startUsabillaSurvey();
        return response;
    };

    const getSessionOver65 = async (): Promise<null | unknown> => {
        const response = await createIrmaSession(
            'demo1/65',
            'irma-qr',
            credentialSource === CredentialSource.DEMO && { demo: true }
        );
        if (response) {
            setIsOver65(
                response['over65'] === 'Yes' ||
                    response['over65'] === 'yes' ||
                    response['over65'] === 'Ja' ||
                    response['over65'] === 'ja'
            );
            setHasResult65(true);
            setHasError(false);
        } else {
            setHasError(true);
        }

        window.scrollTo(0, 0);
        startUsabillaSurvey();
        return response;
    };

    // Preload demo images
    useEffect(() => {
        preloadDemoImages(
            Object.keys(content.responsiveImages.demo1).map(key => content.responsiveImages.demo1[key].src)
        );
    }, []);

    // Define dynamic header image
    const [headerImg, setHeaderImg] = useState<IHeaderImageProps>({
        filename: content.responsiveImages.demo1.header.src,
        alt: content.responsiveImages.demo1.header.alt
    });

    // Update header image for 18+
    useEffect(() => {
        if (hasResult18) {
            if (isOver18) {
                setHeaderImg({
                    filename: content.responsiveImages.demo1.isOver18.src,
                    alt: content.responsiveImages.demo1.isOver18.alt
                });
            } else {
                setHeaderImg({
                    filename: content.responsiveImages.demo1.isNotOver18.src,
                    alt: content.responsiveImages.demo1.isNotOver18.alt
                });
            }
        }
    }, [hasResult18, isOver18]);

    // Update header image for 65+
    useEffect(() => {
        if (hasResult65) {
            if (isOver65) {
                setHeaderImg({
                    filename: content.responsiveImages.demo1.isOver65.src,
                    alt: content.responsiveImages.demo1.isOver65.alt
                });
            } else {
                setHeaderImg({
                    filename: content.responsiveImages.demo1.isNotOver65.src,
                    alt: content.responsiveImages.demo1.isNotOver65.alt
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
                        iconSize={14}
                        heading={content.demo1.isOver18.heading}
                        content={content.demo1.isOver18.content}
                        dataTestId="hasResultAlert"
                    />
                )}
                {hasResult18 && !isOver18 && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<AlertIcon />}
                        iconSize={22}
                        heading={content.demo1.isNotOver18.heading}
                        content={content.demo1.isNotOver18.content}
                        dataTestId="hasResultAlert"
                    />
                )}

                {hasResult65 && isOver65 && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.SUCCESS}
                        icon={<Checkmark />}
                        iconSize={14}
                        heading={content.demo1.isOver65.heading}
                        content={content.demo1.isOver65.content}
                        dataTestId="hasResultAlert"
                    />
                )}
                {hasResult65 && !isOver65 && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<AlertIcon />}
                        iconSize={22}
                        heading={content.demo1.isNotOver65.heading}
                        content={content.demo1.isNotOver65.content}
                        dataTestId="hasResultAlert"
                    />
                )}
                {hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<AlertIcon />}
                        iconSize={22}
                        heading={content.demoErrorAlert.heading}
                        content={content.demoErrorAlert.content}
                        dataTestId="hasErrorAlert"
                    />
                )}
            </ContentBlock>

            <HeaderImage filename={headerImg.filename} alt={headerImg.alt} />

            {!hasResult18 && !hasResult65 ? (
                <AscLocal.Row noMargin>
                    <AscLocal.Column span={{ small: 1, medium: 2, big: 6, large: 9, xLarge: 9 }}>
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
                                <QRCode
                                    getSession={getSessionOver18}
                                    label={content.demo1.button18}
                                    dataTestId="qrCodeButton18"
                                />
                                <QRCode
                                    getSession={getSessionOver65}
                                    label={content.demo1.button65}
                                    dataTestId="qrCodeButton65"
                                />
                            </div>

                            <ReactMarkDown
                                source={content.downloadIrma}
                                renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
                            />
                        </ContentBlock>
                    </AscLocal.Column>
                    <AscLocal.Column span={{ small: 1, medium: 2, big: 6, large: 3, xLarge: 3 }}>
                        <WhyIRMA />
                    </AscLocal.Column>
                </AscLocal.Row>
            ) : (
                <>
                    <ContentBlock>
                        <ReactMarkDown source={content.noSavePromise} />
                    </ContentBlock>
                    <EmphasisBlock>
                        <ContentBlock>
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
                        </ContentBlock>
                    </EmphasisBlock>
                    <ContentBlock>
                        <ReactMarkDown
                            source={content.callToAction}
                            renderers={{
                                heading: AscLocal.H2,
                                paragraph: AscLocal.Paragraph,
                                list: AscLocal.UL,
                                link: AscLocal.InlineLink
                            }}
                        />
                    </ContentBlock>
                </>
            )}
        </PageTemplate>
    );
};

export default Demo1;
