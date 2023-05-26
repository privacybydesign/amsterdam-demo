import React, { useState, useEffect } from 'react';
import ReactMarkDown from 'react-markdown';
import styled from 'styled-components';
import { Accordion, themeSpacing } from '@amsterdam/asc-ui';
import { Alert as AlertIcon } from '@amsterdam/asc-assets';
import { Checkmark } from '@amsterdam/asc-assets';
import useIrmaSession, { IIrmaSessionOutputData } from '@hooks/useIrmaSession';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import ResponsiveImage, { IHeaderImageProps } from '@components/ResponsiveImage/ResponsiveImage';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import WhyIRMA from '@components/WhyIRMA/WhyIRMA';
import preloadDemoImages from '@services/preloadImages';
import { startSurvey as startUsabillaSurvey } from '@services/usabilla';
import { SkipLinkEntry } from '@components/SkipLink/SkipLink';
import { isMobile } from '@services/createIrmaSession';
import { useContent } from '@services/ContentProvider';

export interface IProps {}

const Demo1: React.FC<IProps> = () => {
    const content = useContent();
    const [credentialSource, setCredentialSource] = useState(CredentialSource.DEMO);
    const [isOver18, setIsOver18] = useState<boolean>(false);
    const [hasResult18, setHasResult18] = useState<boolean>(false);
    const [isOver65, setIsOver65] = useState<boolean>(false);
    const [hasResult65, setHasResult65] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const {
        modal: modalOver18,
        url: urlOver18,
        showModal: showModalOver18,
        irmaSession: sessionOver18
    }: IIrmaSessionOutputData = useIrmaSession({
        irmaQrId: 'irma-qr-18',
        demoPath: 'demos/demo1/18',
        useDemoCredentials: credentialSource === CredentialSource.DEMO,
        alwaysShowQRCode: isMobile(),
        resultCallback: (result: any) => {
            if (result && result?.over18 !== undefined) {
                setIsOver18(
                    result['over18'] === 'Yes' ||
                        result['over18'] === 'yes' ||
                        result['over18'] === 'Ja' ||
                        result['over18'] === 'ja'
                );
                setHasResult18(true);
                setHasError(false);
            } else {
                setHasError(true);
            }

            window.scrollTo(0, 0);
            startUsabillaSurvey();
        }
    });

    const {
        modal: modalOver65,
        url: urlOver65,
        showModal: showModalOver65,
        irmaSession: sessionOver65
    } = useIrmaSession({
        irmaQrId: 'irma-qr-65',
        demoPath: 'demos/demo1/65',
        useDemoCredentials: credentialSource === CredentialSource.DEMO,
        alwaysShowQRCode: isMobile(),
        resultCallback: (result: any) => {
            if (result && result?.over65 !== undefined) {
                setIsOver65(
                    (result as any)['over65'] === 'Yes' ||
                        (result as any)['over65'] === 'yes' ||
                        (result as any)['over65'] === 'Ja' ||
                        (result as any)['over65'] === 'ja'
                );
                setHasResult65(true);
                setHasError(false);
            } else {
                setHasError(true);
            }

            window.scrollTo(0, 0);
            startUsabillaSurvey();
        }
    });

    useEffect(() => {
        return () => {
            if (typeof sessionOver18?.abort === 'function') {
                console.log('abort session 18');
                sessionOver18.abort();
            }

            if (typeof sessionOver65?.abort === 'function') {
                console.log('abort session 65');
                sessionOver65.abort();
            }
        };
    }, [sessionOver18, sessionOver65]);

    // Preload demo images
    useEffect(() => {
        preloadDemoImages(
            Object.keys(content.responsiveImages.demo1).map(
                (key: any) => (content.responsiveImages.demo1 as any)[key].src
            )
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
                    renderers={{
                        list: BreadCrumbs,
                        listItem: BreadCrumbs.Item,
                        link: AscLocal.MarkDownToLink
                    }}
                />
                {SkipLinkEntry}
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

            <ResponsiveImage filename={headerImg.filename} alt={headerImg.alt} />

            {!hasResult18 && !hasResult65 ? (
                <AscLocal.Row hasMargin={false}>
                    <AscLocal.Column span={{ small: 1, medium: 2, big: 6, large: 9, xLarge: 9 }}>
                        <ContentBlock>
                            <section>
                                <ReactMarkDown
                                    source={content.demo1.intro}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        paragraph: AscLocal.Paragraph,
                                        list: AscLocal.UL
                                    }}
                                />
                            </section>
                            <section>
                                <AscLocal.AccordionContainer>
                                    <Accordion title={content.demo1.why.title}>
                                        <ReactMarkDown
                                            source={content.demo1.why.body}
                                            renderers={{ paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                                        />
                                    </Accordion>
                                </AscLocal.AccordionContainer>
                            </section>
                            <section>
                                {isMobile() ? (
                                    <>
                                        <AscLocal.QRCodeLink dataTestId="qrCodeButton18" href={urlOver18}>
                                            {content.demo1.button18}
                                        </AscLocal.QRCodeLink>
                                        <AscLocal.QRCodeLink dataTestId="qrCodeButton65" href={urlOver65}>
                                            {content.demo1.button65}
                                        </AscLocal.QRCodeLink>
                                    </>
                                ) : (
                                    <>
                                        <AscLocal.QRCodeButton dataTestId="qrCodeButton18" onClick={showModalOver18}>
                                            {content.demo1.button18}
                                        </AscLocal.QRCodeButton>
                                        <AscLocal.QRCodeButton dataTestId="qrCodeButton65" onClick={showModalOver65}>
                                            {content.demo1.button65}
                                        </AscLocal.QRCodeButton>
                                    </>
                                )}
                                {modalOver18}
                                {modalOver65}
                            </section>
                            <section>
                                <ReactMarkDown
                                    source={content.downloadIrma}
                                    renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
                                />
                            </section>
                            {isMobile() && (
                                <section>
                                    <p>
                                        {content.showQrOnMobile.label}
                                        <AscLocal.ShowQRLink onClick={showModalOver18}>
                                            {content.demo1.showQrOnMobile.link18}
                                        </AscLocal.ShowQRLink>
                                        <AscLocal.ShowQRLink onClick={showModalOver65}>
                                            {content.demo1.showQrOnMobile.link65}
                                        </AscLocal.ShowQRLink>
                                    </p>
                                </section>
                            )}
                        </ContentBlock>
                    </AscLocal.Column>
                    <AscLocal.Column span={{ small: 1, medium: 2, big: 6, large: 3, xLarge: 3 }}>
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
                            <ReactMarkDown source={content.demo1.result.title} />
                            <section>
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
                            </section>
                        </ContentBlock>
                    </EmphasisBlock>
                    <ContentBlock>
                        <section>
                            <ReactMarkDown
                                source={content.callToAction}
                                renderers={{
                                    heading: AscLocal.H2,
                                    paragraph: AscLocal.Paragraph,
                                    list: AscLocal.UL,
                                    link: AscLocal.MarkDownToLink
                                }}
                            />
                        </section>
                    </ContentBlock>
                </>
            )}
        </PageTemplate>
    );
};

export default Demo1;
