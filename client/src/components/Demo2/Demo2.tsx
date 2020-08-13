import React, { useState, useMemo, useReducer } from 'react';
import createIrmaSession from '@services/createIrmaSession';
import getGGW from '@services/getGGW';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Link, Accordion } from '@datapunt/asc-ui';
import { Alert as AlertIcon } from '@datapunt/asc-assets';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import QRCode from '@components/QRCode/QRCode';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import HeaderImage, { IHeaderImageProps } from '@components/HeaderImage/HeaderImage';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';
import { Checkmark } from '@datapunt/asc-assets';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import WhyIRMA from '@components/WhyIRMA/WhyIRMA';

export interface IProps {}

interface IState {
    hasResult?: boolean;
    hasError?: boolean;
    isOver18?: null | boolean;
    wijk?: string;
    ggw?: string;
    code?: string;
}

const initialState: IState = {
    hasResult: false,
    hasError: false,
    isOver18: null,
    wijk: '',
    ggw: '',
    code: ''
};

function reducer(state, newState) {
    return { ...state, ...newState };
}

const Demo2: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.DEMO);
    const [state, dispatch] = useReducer(reducer, initialState);

    const getSession = async () => {
        const response = await createIrmaSession('demo2', 'irma-qr', credentialSource === CredentialSource.DEMO);
        const newState: IState = { ...initialState };
        if (response) {
            const postcode = response['zipcode'].replace(/ /, '');
            newState.hasResult = true;
            newState.hasError = false;

            const ggwResponse = await getGGW(postcode);
            newState.isOver18 = response['over18'] === 'Yes';

            if (ggwResponse) {
                newState.wijk = ggwResponse.buurtcombinatieNamen;
                newState.code = ggwResponse.ggwCode;
                newState.ggw = ggwResponse.ggwNaam;
            }
        } else {
            newState.hasError = true;
        }

        dispatch(newState);
        window.scrollTo(0, 0);
        return response;
    };

    const { hasResult, hasError, isOver18, wijk, ggw, code } = state;

    const headerImg = useMemo((): IHeaderImageProps => {
        const regExp = /\[\]/;

        if (!hasResult) {
            return { filename: content.images.demo2.header.src, alt: content.images.demo2.header.alt };
        } else if (wijk.length) {
            return {
                filename: code ? `wijken/${code}` : content.images.demo2.headerWithAmsterdam.src,
                alt: code
                    ? content.images.demo2.headerWithWijk.alt.replace(regExp, ggw)
                    : content.images.demo2.headerWithAmsterdam.alt
            };
        } else if (isOver18) {
            return {
                filename: content.images.demo2.postcodeNegative.src,
                alt: content.images.demo2.postcodeNegative.alt
            };
        } else if (!isOver18) {
            return {
                filename: content.images.demo2.ageAndPostcodeNegative.src,
                alt: content.images.demo2.ageAndPostcodeNegative.alt
            };
        }
    }, [hasResult, wijk, code, ggw, isOver18]);

    const resultAlert: JSX.Element = useMemo(() => {
        const regExp = /\[\]/;
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
                />
            );
        } else if (isOver18 && wijk.length) {
            return (
                <AscLocal.Alert
                    color={AscLocal.AlertColor.SUCCESS}
                    icon={<Checkmark />}
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyAgeAndPostcodePositive.replace(regExp, wijk)}
                />
            );
        } else if (!isOver18 && wijk.length) {
            return (
                <AscLocal.Alert
                    color={AscLocal.AlertColor.ERROR}
                    icon={<AlertIcon />}
                    iconSize={22}
                    heading={content.demo2.proven.alert.title}
                    content={content.demo2.proven.alert.bodyAgeNegative.replace(regExp, wijk)}
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
                />
            );
        }
    }, [hasResult, hasError, isOver18, wijk]);

    return (
        <PageTemplate>
            <ContentBlock>
                <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />
                {!hasResult && <DemoNotification />}
                <ReactMarkDown
                    source={content.demo2.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />
                <ReactMarkDown
                    source={content.demo2[hasResult ? 'proven' : 'unproven'].title}
                    renderers={{ heading: AscLocal.H1 }}
                />
                {resultAlert}
            </ContentBlock>
            <HeaderImage filename={headerImg.filename} alt={headerImg.alt} />
            {!hasResult ? (
                <ContentBlock>
                    <ReactMarkDown
                        source={content.demo2.intro}
                        renderers={{ heading: AscLocal.H2, list: AscLocal.UL }}
                    />
                    <AscLocal.AccordionContainer>
                        <Accordion title={content.demo2.why.title}>
                            <ReactMarkDown
                                source={content.demo2.why.body}
                                renderers={{ paragraph: AscLocal.Paragraph, heading: AscLocal.AccordionHeading }}
                            />
                        </Accordion>
                    </AscLocal.AccordionContainer>
                    <QRCode getSession={getSession} label={content.demo2.button} />
                    <ReactMarkDown
                        source={content.downloadIrma}
                        renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
                    />
                </ContentBlock>
            ) : (
                <AscLocal.Row>
                    <AscLocal.Column span={{ small: 1, medium: 2, big: 6, large: 9, xLarge: 9 }}>
                        <ContentBlock>
                            <ReactMarkDown
                                source={content.noSavePromise}
                                renderers={{
                                    heading: AscLocal.H2,
                                    paragraph: AscLocal.Paragraph,
                                    list: AscLocal.UL,
                                    link: Link
                                }}
                            />
                            <EmphasisBlock>
                                <ReactMarkDown
                                    source={content.demo2.result}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        paragraph: AscLocal.Paragraph,
                                        list: AscLocal.UL,
                                        link: Link
                                    }}
                                />
                            </EmphasisBlock>
                            <ReactMarkDown source={content.callToAction} />
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

export default Demo2;
