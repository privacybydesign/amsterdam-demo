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
import { startSurvey as startUsabillaSurvey } from '@services/usabilla';

export interface IProps {}
// @todo add error flow with incorrect data

const Demo5: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.DEMO);
    const [hasResult, setHasResult] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const getSession = async () => {
        const response = await createIrmaSession('demo5', 'irma-qr', credentialSource === CredentialSource.DEMO);
        if (response) {
            setHasResult(true);
            setHasError(false);
            // setBsn(response['bsn']);
            // setName(response['fullname']);
        } else {
            setHasError(true);
        }
        window.scrollTo(0, 0);
        startUsabillaSurvey();
        return response;
    };

    // Define dynamic header image
    const [headerImg, setHeaderImg] = useState<IHeaderImageProps>({
        filename: content.responsiveImages.demo5.header.src,
        alt: content.responsiveImages.demo5.header.alt
    });

    // Preload demo images
    useEffect(() => {
        preloadDemoImages(
            Object.keys(content.responsiveImages.demo5).map(key => content.responsiveImages.demo5[key].src)
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
            <ContentBlock>
                <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />

                {!hasResult && !hasError && <DemoNotification />}
                <ReactMarkDown
                    source={content.demo5.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />

                <ReactMarkDown
                    source={content.demo5[hasResult ? 'proven' : 'unproven'].title}
                    renderers={{ heading: AscLocal.H1 }}
                />

                {hasResult && !hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.SUCCESS}
                        icon={<Checkmark />}
                        iconSize={14}
                        heading={content.demo5.proven.alert.title}
                        content={content.demo5.proven.alert.body.replace(/\[\]/, name)}
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
                                source={content.demo5.unproven.intro1}
                                renderers={{
                                    heading: AscLocal.H2,
                                    paragraph: AscLocal.Paragraph,
                                    list: AscLocal.UL
                                }}
                            />
                            <AscLocal.AccordionContainer>
                                <Accordion title={content.demo5.unproven.why.title}>
                                    <ReactMarkDown
                                        source={content.demo5.unproven.why.body}
                                        renderers={{
                                            paragraph: AscLocal.Paragraph,
                                            list: AscLocal.UL
                                        }}
                                    />
                                </Accordion>
                            </AscLocal.AccordionContainer>
                            {/* // TODO: Add form */}
                            <QRCode getSession={getSession} label={content.demo5.button} />
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
                        <ReactMarkDown source={content.demo5.result.intro} />
                    </ContentBlock>
                    <EmphasisBlock>
                        <ContentBlock>
                            <ReactMarkDown
                                source={content.demo5.result.yourReport}
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
                            source={content.demo5.result.rest}
                            renderers={{
                                heading: AscLocal.H2,
                                paragraph: AscLocal.Paragraph,
                                list: AscLocal.UL,
                                link: AscLocal.InlineLink
                            }}
                        />
                        <ReactMarkDown source={content.callToAction} />
                    </ContentBlock>
                </>
            )}
        </PageTemplate>
    );
};

export default Demo5;
