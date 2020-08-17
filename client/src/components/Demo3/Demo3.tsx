import React, { useState, useEffect } from 'react';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion } from '@datapunt/asc-ui';
import { Alert as AlertIcon } from '@datapunt/asc-assets';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import HeaderImage, { IHeaderImageProps } from '@components/HeaderImage/HeaderImage';
import QRCode from '@components/QRCode/QRCode';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';
import { Checkmark } from '@datapunt/asc-assets';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import WhyIRMA from '@components/WhyIRMA/WhyIRMA';
import preloadDemoImages from '@services/preloadImages';

export interface IProps {}
// @todo add error flow with incorrect data

const Demo3: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.DEMO);
    const [hasResult, setHasResult] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    // const [bsn, setBsn] = useState<string>('');
    const [name, setName] = useState<string>('');

    const getSession = async () => {
        const response = await createIrmaSession('demo3', 'irma-qr', credentialSource === CredentialSource.DEMO);
        if (response) {
            setHasResult(true);
            setHasError(false);
            // setBsn(response['bsn']);
            setName(response['fullname']);
        } else {
            setHasError(true);
        }
        window.scrollTo(0, 0);
        return response;
    };

    // Define dynamic header image
    const [headerImg, setHeaderImg] = useState<IHeaderImageProps>({
        filename: content.responsiveImages.demo3.header.src,
        alt: content.responsiveImages.demo3.header.alt
    });

    // Preload demo images
    useEffect(() => {
        preloadDemoImages(
            Object.keys(content.responsiveImages.demo3).map(key => content.responsiveImages.demo3[key].src)
        );
    }, []);

    // Update header image for 18+
    useEffect(() => {
        if (hasResult) {
            setHeaderImg({
                filename: content.responsiveImages.demo3.headerResult.src,
                alt: content.responsiveImages.demo3.headerResult.alt
            });
        }
    }, [hasResult]);

    return (
        <PageTemplate>
            <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />

            <ContentBlock>
                <ReactMarkDown
                    source={content.demo3.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />

                {!hasResult && !hasError && <DemoNotification />}

                {hasResult && !hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.SUCCESS}
                        icon={<Checkmark />}
                        iconSize={14}
                        heading={content.demo3.proven.alert.title}
                        content={content.demo3.proven.alert.body.replace(/\[\]/, name)}
                    />
                )}

                {hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<AlertIcon />}
                        iconSize={22}
                        heading={content.demoErrorAlert.heading}
                        content={content.demoErrorAlert.content}
                    />
                )}

                <ReactMarkDown
                    source={content.demo3[hasResult ? 'proven' : 'unproven'].title}
                    renderers={{ heading: AscLocal.H1 }}
                />
            </ContentBlock>

            <HeaderImage filename={headerImg.filename} alt={headerImg.alt} />

            {!hasResult ? (
                <AscLocal.Row noMargin>
                    <AscLocal.Column
                        span={{
                            small: 1,
                            medium: 2,
                            big: 6,
                            large: 9,
                            xLarge: 9
                        }}
                    >
                        <ContentBlock>
                            <ReactMarkDown
                                source={content.demo3.unproven.intro}
                                renderers={{
                                    heading: AscLocal.H2,
                                    paragraph: AscLocal.Paragraph,
                                    list: AscLocal.UL
                                }}
                            />

                            <AscLocal.AccordionContainer>
                                <Accordion title={content.demo3.unproven.why.title}>
                                    <ReactMarkDown
                                        source={content.demo3.unproven.why.body}
                                        renderers={{
                                            paragraph: AscLocal.Paragraph,
                                            list: AscLocal.UL
                                        }}
                                    />
                                </Accordion>
                            </AscLocal.AccordionContainer>

                            <QRCode getSession={getSession} label={content.demo3.button} />

                            <ReactMarkDown
                                source={content.downloadIrma}
                                renderers={{
                                    paragraph: AscLocal.Paragraph,
                                    link: ExternalLink
                                }}
                            />
                        </ContentBlock>
                    </AscLocal.Column>
                    <AscLocal.Column
                        span={{
                            small: 1,
                            medium: 2,
                            big: 6,
                            large: 3,
                            xLarge: 3
                        }}
                    >
                        <WhyIRMA />
                    </AscLocal.Column>
                </AscLocal.Row>
            ) : (
                <>
                    <ContentBlock>
                        <EmphasisBlock>
                            <ReactMarkDown
                                source={content.demo3.result}
                                renderers={{
                                    heading: AscLocal.H2,
                                    paragraph: AscLocal.Paragraph,
                                    list: AscLocal.UL
                                }}
                            />
                        </EmphasisBlock>
                        <ReactMarkDown source={content.callToAction} />
                    </ContentBlock>
                </>
            )}
        </PageTemplate>
    );
};

export default Demo3;
