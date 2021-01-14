import React, { useState, useEffect, useRef, useReducer } from 'react';
import createIrmaSession from '@services/createIrmaSession';
import content, { reduceAndTranslateEmptyVars } from '@services/content';
import ReactMarkDown from 'react-markdown';
import defList from '@services/deflist';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion } from '@amsterdam/asc-ui';
import { Checkmark, Alert } from '@amsterdam/asc-assets';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import HeaderImage, { IHeaderImageProps } from '@components/HeaderImage/HeaderImage';
import { RadioGroup, Label, Radio } from '@amsterdam/asc-ui';
import QRCode from '@components/QRCode/QRCode';
import { initialState, reducer } from './reducer';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import preloadDemoImages from '@services/preloadImages';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';
import { startSurvey as startUsabillaSurvey } from '@services/usabilla';
import WhyIRMA from '@components/WhyIRMA/WhyIRMA';

export interface IProps {}

const OPTIONAL_IRMA_ATTRIBUTES = ['houseNumber'];

const Demo4: React.FC<IProps> = () => {
    const formEl = useRef(null);

    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [state, dispatch] = useReducer(reducer, initialState);

    function replaceVars(str, p1) {
        if (!OPTIONAL_IRMA_ATTRIBUTES.includes(p1)) {
            return state.irmaAttributes[p1] || '-';
        }
        return '';
    }

    const validateForm = () => {
        const el = formEl.current.querySelector('input[name=geveltuin]:checked');
        if (el) {
            dispatch({
                type: 'validateForm',
                payload: {
                    owner: el.getAttribute('value')
                }
            });
            return true;
        }

        dispatch({
            type: 'invalidateForm'
        });
        return false;
    };

    const getSession = async () => {
        let response = null;
        if (validateForm()) {
            response = await createIrmaSession(
                'demo4',
                'irma-qr',
                credentialSource === CredentialSource.DEMO && { demo: true }
            );
            if (response) {
                dispatch({
                    type: 'setProperties',
                    payload: {
                        name: response['fullname'],
                        street: response['street'],
                        houseNumber: response['houseNumber'],
                        zipcode: response['zipcode'],
                        city: response['city'],
                        telephone: response['mobilenumber'],
                        email: response['email']
                    }
                });
            } else {
                dispatch({
                    type: 'setError'
                });
            }

            window.scrollTo(0, 0);
            startUsabillaSurvey();
        }
        return response;
    };

    const [headerImg, setHeaderImg] = useState<IHeaderImageProps>({
        filename: content.responsiveImages.demo4.header.src,
        alt: content.responsiveImages.demo4.header.alt
    });

    const { hasResult, hasError, emptyVars, formValid } = state;

    // Update header image
    useEffect(() => {
        if (hasResult) {
            setHeaderImg({
                filename: content.responsiveImages.demo4.headerResult.src,
                alt: content.responsiveImages.demo4.headerResult.alt
            });
        }
    }, [hasResult]);

    useEffect(() => {
        if (hasResult) {
            for (const [key, value] of Object.entries(state.irmaAttributes)) {
                if (!value && !OPTIONAL_IRMA_ATTRIBUTES.includes(key)) {
                    dispatch({
                        type: 'setEmptyVars',
                        payload: {
                            emptyVar: key
                        }
                    });
                }
            }
        }
    }, [hasResult]);

    // Preload demo images
    useEffect(() => {
        preloadDemoImages(
            Object.keys(content.responsiveImages.demo4).map(key => content.responsiveImages.demo4[key].src)
        );
    }, []);

    return (
        <PageTemplate>
            <ContentBlock>
                <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />

                {!hasResult && !hasError && <DemoNotification />}

                <ReactMarkDown
                    source={content.demo4.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />

                <ReactMarkDown
                    source={content.demo4[hasResult ? 'proven' : 'unproven'].title}
                    renderers={{ heading: AscLocal.H1 }}
                />

                {hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<Alert />}
                        iconSize={22}
                        heading={content.demoErrorAlert.heading}
                        content={content.demoErrorAlert.content}
                        dataTestId="hasErrorAlert"
                    />
                )}

                {emptyVars.length > 0 && !hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<Alert />}
                        iconSize={22}
                        heading={content.demoEmptyVarsAlert.heading}
                        content={content.demoEmptyVarsAlert.content}
                        contentExtended={`${reduceAndTranslateEmptyVars(state.emptyVars)}.`}
                        dataTestId="hasErrorAlert"
                    />
                )}

                {hasResult && !hasError && emptyVars.length === 0 && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.SUCCESS}
                        icon={<Checkmark />}
                        heading={content.demo4.proven.alert.title}
                        content={content.demo4.proven.alert.body}
                        dataTestId="hasResultAlert"
                    />
                )}
            </ContentBlock>

            <HeaderImage filename={headerImg.filename} alt={headerImg.alt} />

            {!hasResult ? (
                <AscLocal.Row noMargin>
                    <AscLocal.Column span={{ small: 1, medium: 2, big: 6, large: 9, xLarge: 9 }}>
                        <ContentBlock>
                            <ReactMarkDown
                                source={content.demo4.unproven.intro1}
                                renderers={{ heading: AscLocal.H3, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                            />

                            <AscLocal.AccordionContainer>
                                <Accordion title={content.demo4.unproven.why.title}>
                                    <ReactMarkDown
                                        source={content.demo4.unproven.why.body}
                                        renderers={{ paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                                    />
                                </Accordion>
                            </AscLocal.AccordionContainer>

                            <AscLocal.H3>Demo-aanvraag Geveltuin</AscLocal.H3>

                            <AscLocal.CroppedAlert
                                color={AscLocal.AlertColor.PRIMARY}
                                iconUrl="assets/icon-info.svg"
                                iconSize={14}
                                heading={content.demo4.unproven.alert.title}
                                content={content.demo4.unproven.alert.body}
                            />

                            <form ref={formEl}>
                                <ReactMarkDown
                                    source={content.demo4.form.owner}
                                    renderers={{ paragraph: AscLocal.Paragraph }}
                                />

                                <RadioGroup name="geveltuin" error={!formValid}>
                                    <Label htmlFor="yes" label={content.demo4.form.optionYes}>
                                        <Radio id="yes" variant="primary" value={content.demo4.form.optionYes} />
                                    </Label>
                                    <Label htmlFor="no" label={content.demo4.form.optionNo}>
                                        <Radio id="no" variant="primary" value={content.demo4.form.optionNo} />
                                    </Label>
                                </RadioGroup>
                                {!formValid && <AscLocal.ErrorMessage message={content.demo4.form.required} />}
                            </form>

                            <ReactMarkDown
                                source={content.demo4.unproven.intro2}
                                renderers={{ heading: AscLocal.H3, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                            />

                            <QRCode getSession={getSession} label={content.demo4.button} />

                            <ReactMarkDown
                                source={content.downloadIrma}
                                renderers={{ paragraph: AscLocal.Paragraph, link: ExternalLink }}
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
                        <ReactMarkDown
                            source={content.demo4.result.intro}
                            renderers={{ heading: AscLocal.H3, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                        />

                        <AscLocal.TintedContainerLevel3>
                            <ReactMarkDown
                                source={content.demo4.result.yourDemoRequest.replace(/\[(.*?)\]/gm, replaceVars)}
                                renderers={{
                                    heading: AscLocal.H3,
                                    paragraph: AscLocal.Paragraph,
                                    list: AscLocal.UL,
                                    ...AscLocal.DefinitionList
                                }}
                                plugins={[defList]}
                            />
                        </AscLocal.TintedContainerLevel3>

                        <AscLocal.TintedContainerLevel3>
                            <ReactMarkDown
                                source={content.demo4.result.yourDetails.replace(/\[(.*?)\]/gm, replaceVars)}
                                renderers={{
                                    heading: AscLocal.H3,
                                    paragraph: AscLocal.Paragraph,
                                    list: AscLocal.UL,
                                    ...AscLocal.DefinitionList
                                }}
                                plugins={[defList]}
                            />
                        </AscLocal.TintedContainerLevel3>
                    </ContentBlock>
                    <EmphasisBlock>
                        <ContentBlock>
                            <ReactMarkDown
                                source={content.demo4.result.rest}
                                renderers={{ heading: AscLocal.H3, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                            />
                        </ContentBlock>
                    </EmphasisBlock>
                    <ContentBlock>
                        <ReactMarkDown source={content.callToAction} />
                    </ContentBlock>
                </>
            )}
        </PageTemplate>
    );
};

export default Demo4;
