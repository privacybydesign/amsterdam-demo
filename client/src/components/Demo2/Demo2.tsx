import React, { useState, useMemo, useEffect, useReducer, useCallback } from 'react';
import getGGW from '@services/getGGW';
import content, { insertInPlaceholders, reduceAndTranslateEmptyVars } from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion } from '@amsterdam/asc-ui';
import { Alert as AlertIcon } from '@amsterdam/asc-assets';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import ExternalLink from '@components/ExternalLink/ExternalLink';
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

interface IState {
    hasResult: boolean;
    hasError: boolean;
    emptyVars: string[];
    isOver18: null | boolean;
    wijk: string;
    ggw: string;
    code: string;
}

const initialState: IState = {
    hasResult: false,
    hasError: false,
    isOver18: null,
    emptyVars: [],
    wijk: '',
    ggw: '',
    code: ''
};

function reducer(state: IState, newState: IState) {
    return { ...state, ...newState };
}

const Demo2: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [state, dispatch] = useReducer(reducer, initialState);

    const { modal, startIrmaSession }: IIrmaSessionOutputData = useIrmaSession();

    const getSession = useCallback(
        (event, alwaysShowQRCode = false) => {
            event.persist();
            startIrmaSession({
                demoPath: 'demos/demo2',
                useDemoCredentials: credentialSource === CredentialSource.DEMO,
                alwaysShowQRCode,
                resultCallback: async (result: any) => {
                    const newState: IState = { ...initialState };
                    if (result) {
                        newState.hasResult = true;
                        newState.hasError = false;

                        newState.isOver18 =
                            result['over18'] === 'Yes' ||
                            result['over18'] === 'yes' ||
                            result['over18'] === 'Ja' ||
                            result['over18'] === 'ja';

                        if (result['over18']?.length === 0) {
                            newState.emptyVars.push('over18');
                        }

                        if (!result['zipcode']) {
                            newState.emptyVars.push('zipcode');
                        } else {
                            const postcode = result['zipcode'].replace(/ /, '');

                            const ggwResponse = await getGGW(postcode);

                            if (ggwResponse) {
                                newState.wijk = ggwResponse.buurtcombinatieNamen;
                                newState.code = ggwResponse.ggwCode;
                                newState.ggw = ggwResponse.ggwNaam;
                            }
                        }
                    } else {
                        newState.hasError = true;
                    }

                    dispatch(newState);
                    window.scrollTo(0, 0);
                    startUsabillaSurvey();
                }
            });
        },
        [credentialSource, startIrmaSession]
    );

    const { hasResult, hasError, emptyVars, isOver18, wijk, ggw, code } = state;

    // Preload demo images
    useEffect(() => {
        // Note that we're not preloading all the 'wijk'-photos
        preloadDemoImages(
            Object.keys(content.responsiveImages.demo2).map(key => (content.responsiveImages.demo2 as any)[key].src)
        );
    }, []);

    // Define dynamic header image
    const headerImg = useMemo((): IHeaderImageProps => {
        if (!hasResult) {
            return {
                filename: content.responsiveImages.demo2.header.src,
                alt: content.responsiveImages.demo2.header.alt
            };
        } else if (wijk.length) {
            return {
                filename: code ? `wijken/${code}` : content.responsiveImages.demo2.headerWithAmsterdam.src,
                alt: code
                    ? insertInPlaceholders(content.responsiveImages.demo2.headerWithWijk.alt, ggw)
                    : content.responsiveImages.demo2.headerWithAmsterdam.alt
            };
        } else if (isOver18) {
            return {
                filename: content.responsiveImages.demo2.postcodeNegative.src,
                alt: content.responsiveImages.demo2.postcodeNegative.alt
            };
        } else {
            return {
                filename: content.responsiveImages.demo2.ageAndPostcodeNegative.src,
                alt: content.responsiveImages.demo2.ageAndPostcodeNegative.alt
            };
        }
    }, [hasResult, wijk, code, ggw, isOver18]);

    const resultAlert: JSX.Element | null | undefined = useMemo(() => {
        if (!hasResult && !hasError) {
            return null;
        } else if (hasError) {
            return (
                <AscLocal.Alert
                    color={AscLocal.AlertColor.ERROR}
                    icon={<AlertIcon />}
                    iconSize={22}
                    heading={content.demoErrorAlert.heading}
                    content={content.demoErrorAlert.content}
                    dataTestId="hasErrorAlert"
                />
            );
        } else if (emptyVars.length > 0) {
            return (
                <AscLocal.Alert
                    color={AscLocal.AlertColor.ERROR}
                    icon={<AlertIcon />}
                    iconSize={22}
                    heading={content.demoEmptyVarsAlert.heading}
                    content={`${content.demoEmptyVarsAlert.content}${reduceAndTranslateEmptyVars(state.emptyVars)}.`}
                    dataTestId="hasErrorAlert"
                />
            );
        } else if (isOver18 && wijk.length) {
            return (
                <AscLocal.Alert
                    color={AscLocal.AlertColor.SUCCESS}
                    icon={<Checkmark />}
                    iconSize={14}
                    heading={content.demo2.proven.alert.title}
                    content={insertInPlaceholders(content.demo2.proven.alert.bodyAgeAndPostcodePositive, wijk)}
                    dataTestId="hasResultAlert"
                />
            );
        } else if (!isOver18 && wijk.length) {
            return (
                <AscLocal.Alert
                    color={AscLocal.AlertColor.ERROR}
                    icon={<AlertIcon />}
                    iconSize={22}
                    heading={content.demo2.proven.alert.title}
                    content={insertInPlaceholders(content.demo2.proven.alert.bodyAgeNegative, wijk)}
                    dataTestId="hasResultAlert"
                />
            );
        } else if (isOver18 && !wijk.length) {
            return (
                <AscLocal.Alert
                    color={AscLocal.AlertColor.ERROR}
                    icon={<AlertIcon />}
                    iconSize={22}
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyPostcodeNegative}
                    dataTestId="hasResultAlert"
                />
            );
        } else if (!isOver18 && !wijk.length) {
            return (
                <AscLocal.Alert
                    color={AscLocal.AlertColor.ERROR}
                    icon={<AlertIcon />}
                    iconSize={22}
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyAgeAndPostcodeNegative}
                    dataTestId="hasResultAlert"
                />
            );
        }
    }, [hasResult, hasError, isOver18, wijk, emptyVars.length, state.emptyVars]);

    return (
        <PageTemplate>
            <ContentBlock>
                <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />
                {!hasResult && <DemoNotification />}
                <ReactMarkDown
                    source={content.demo2.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />
                {SkipLinkEntry}
                <ReactMarkDown
                    source={content.demo2[hasResult ? 'proven' : 'unproven'].title}
                    renderers={{ heading: AscLocal.H1 }}
                />
                {resultAlert}
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
                                    source={content.demo2.intro}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        list: AscLocal.UL
                                    }}
                                />
                            </section>
                            <section>
                                <AscLocal.AccordionContainer>
                                    <Accordion title={content.demo2.why.title}>
                                        <ReactMarkDown
                                            source={content.demo2.why.body}
                                            renderers={{
                                                paragraph: AscLocal.Paragraph,
                                                heading: AscLocal.AccordionHeading
                                            }}
                                        />
                                    </Accordion>
                                </AscLocal.AccordionContainer>
                            </section>
                            <section>
                                <AscLocal.QRCodeButton onClick={getSession}>
                                    {content.demo2.button}
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
                                    <AscLocal.UnderlinedLink onClick={(e: React.SyntheticEvent) => getSession(e, true)}>
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
                                    source={content.demo2.result}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        paragraph: AscLocal.Paragraph,
                                        list: AscLocal.UL,
                                        link: AscLocal.UnderlinedLink
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
                                    link: AscLocal.InlineLink
                                }}
                            />
                        </section>
                    </ContentBlock>
                </>
            )}
        </PageTemplate>
    );
};

export default Demo2;
