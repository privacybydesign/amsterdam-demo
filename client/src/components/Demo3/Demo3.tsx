import React, { useState, useEffect, useCallback } from 'react';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion } from '@amsterdam/asc-ui';
import { Alert as AlertIcon } from '@amsterdam/asc-assets';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import ResponsiveImage, { IHeaderImageProps } from '@components/ResponsiveImage/ResponsiveImage';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';
import { Checkmark } from '@amsterdam/asc-assets';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import WhyIRMA from '@components/WhyIRMA/WhyIRMA';
import preloadDemoImages from '@services/preloadImages';
import { startSurvey as startUsabillaSurvey } from '@services/usabilla';
import { SkipLinkEntry } from '@components/SkipLink/SkipLink';
import useIrmaSession, { IIrmaSessionOutputData } from '@hooks/useIrmaSession';
import { isMobile } from '@services/createIrmaSession';

export interface IProps {}
// @todo add error flow with incorrect data

const Demo3: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [hasResult, setHasResult] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    // const [bsn, setBsn] = useState<string>('');
    const [name, setName] = useState<string>('');

    const { modal, startIrmaSession }: IIrmaSessionOutputData = useIrmaSession();

    const getSession = useCallback(
        (alwaysShowQRCode = false) => {
            startIrmaSession({
                demoPath: 'demos/demo3',
                useDemoCredentials: credentialSource === CredentialSource.DEMO,
                alwaysShowQRCode,
                resultCallback: async (result: any) => {
                    if (result) {
                        setHasResult(true);
                        setHasError(false);
                        // setBsn(response['bsn']);
                        setName(result['fullname']);
                    } else {
                        setHasError(true);
                    }
                    window.scrollTo(0, 0);
                    startUsabillaSurvey();
                }
            });
        },
        [credentialSource, startIrmaSession]
    );

    // Define dynamic header image
    const [headerImg, setHeaderImg] = useState<IHeaderImageProps>({
        filename: content.responsiveImages.demo3.header.src,
        alt: content.responsiveImages.demo3.header.alt
    });

    // Preload demo images
    useEffect(() => {
        preloadDemoImages(
            Object.keys(content.responsiveImages.demo3).map(key => (content.responsiveImages.demo3 as any)[key].src)
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
                    source={content.demo3.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />
                {SkipLinkEntry}
                <ReactMarkDown
                    source={content.demo3[hasResult ? 'proven' : 'unproven'].title}
                    renderers={{ heading: AscLocal.H1 }}
                />

                {hasResult && !hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.SUCCESS}
                        icon={<Checkmark />}
                        iconSize={14}
                        heading={content.demo3.proven.alert.title}
                        content={content.demo3.proven.alert.body.replace(/\[\]/, name)}
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

            <ResponsiveImage filename={headerImg.filename} alt={headerImg.alt} />

            {!hasResult ? (
                <AscLocal.Row hasMargin={false}>
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
                            <section>
                                <ReactMarkDown
                                    source={content.demo3.unproven.intro}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        paragraph: AscLocal.Paragraph,
                                        list: AscLocal.UL
                                    }}
                                />
                            </section>
                            <section>
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
                            </section>
                            <section>
                                <AscLocal.QRCodeButton onClick={getSession}>
                                    {content.demo3.button}
                                </AscLocal.QRCodeButton>
                                {modal}
                            </section>
                            <section>
                                <ReactMarkDown
                                    source={content.downloadIrma}
                                    renderers={{
                                        paragraph: AscLocal.Paragraph,
                                        link: ExternalLink
                                    }}
                                />
                            </section>
                            {isMobile() && (
                                <section>
                                    {content.showQrOnMobile.label}
                                    <br />
                                    <AscLocal.UnderlinedLink onClick={() => getSession(true)}>
                                        {content.showQrOnMobile.link}
                                    </AscLocal.UnderlinedLink>
                                </section>
                            )}
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
                        <section>
                            <ReactMarkDown source={content.noSavePromise} />
                        </section>
                    </ContentBlock>
                    <EmphasisBlock>
                        <ContentBlock>
                            <section>
                                <ReactMarkDown
                                    source={content.demo3.result}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        paragraph: AscLocal.Paragraph,
                                        list: AscLocal.UL
                                    }}
                                />
                            </section>
                            <section>
                                <ReactMarkDown
                                    source={content.callToAction}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        paragraph: AscLocal.Paragraph,
                                        list: AscLocal.UL,
                                        link: AscLocal.InlineLink
                                    }}
                                />
                            </section>
                        </ContentBlock>
                    </EmphasisBlock>
                </>
            )}
        </PageTemplate>
    );
};

export default Demo3;
