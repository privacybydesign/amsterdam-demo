import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import deflist from '@services/deflist';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion, themeSpacing, Button } from '@datapunt/asc-ui';
import { Alert as AlertIcon } from '@datapunt/asc-assets';
// import { Map, BaseLayer, Marker } from '@datapunt/arm-core';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import HeaderImage, { IHeaderImageProps } from '@components/HeaderImage/HeaderImage';
import QRCode from '@components/QRCode/QRCode';
import { Checkmark } from '@datapunt/asc-assets';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import WhyIRMA from '@components/WhyIRMA/WhyIRMA';
import preloadDemoImages from '@services/preloadImages';
import { startSurvey as startUsabillaSurvey } from '@services/usabilla';
import { reducer, initialState } from './reducer';
import { Location } from '@components/Map/reducer';
import Demo5Form, { FormFields } from './Demo5Form';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';

export interface IProps {}

export interface IDemo5Query {
    demo?: boolean;
    phone: boolean;
    email: boolean;
}

const Demo5: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.DEMO);
    const [state, dispatch] = useReducer(reducer, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    function replaceVars(str, p1) {
        return state[p1] || '-';
    }

    // Form validator (uncontrolled)
    const validateForm = useCallback(
        (setErrors = true) => {
            const formErrors = [];

            // TODO: Include location
            const location = state.location;
            if (!location) {
                formErrors.push(FormFields.LOCATION);
            }

            const report = (formRef.current.querySelector(`#${FormFields.REPORT}`) as HTMLTextAreaElement).value;
            if (!report.length) {
                formErrors.push(FormFields.REPORT);
            }

            let optionPhone;
            const optionPhoneChecked: HTMLInputElement = formRef.current.querySelector(
                `input[name=${FormFields.OPTION_PHONE}]:checked`
            );
            if (!optionPhoneChecked) {
                formErrors.push(FormFields.OPTION_PHONE);
            } else {
                optionPhone = optionPhoneChecked.value === content.demo5.form.optionPhone.optionYes;
            }

            let optionEmail;
            const optionEmailChecked: HTMLInputElement = formRef.current.querySelector(
                `input[name=${FormFields.OPTION_EMAIL}]:checked`
            );
            if (!optionEmailChecked) {
                formErrors.push(FormFields.OPTION_EMAIL);
            } else {
                optionEmail = optionEmailChecked.value === content.demo5.form.optionPhone.optionYes;
            }

            dispatch({
                type: 'validateForm',
                payload: { location, report, optionPhone, optionEmail, formErrors: setErrors ? formErrors : [] }
            });
            return { errors: setErrors ? formErrors : [], values: { location, report, optionPhone, optionEmail } };
        },
        [state.location]
    );

    const updateLocationCallback = useCallback((location: Location) => {
        dispatch({
            type: 'setLocation',
            payload: {
                location
            }
        });
    }, []);

    // IRMA session
    const getSession = async () => {
        let response = null;
        const validatedForm = validateForm();

        if (!validatedForm.errors.length) {
            // Only use IRMA flow when the user selected the Yes option phone, email or both
            if (validatedForm.values.optionPhone === true || validatedForm.values.optionEmail === true) {
                const query: IDemo5Query = {
                    phone: validatedForm.values.optionPhone,
                    email: validatedForm.values.optionEmail
                };
                if (credentialSource === CredentialSource.DEMO) {
                    query.demo = true;
                }
                response = await createIrmaSession('demo5', 'irma-qr', query);
            } else {
                // No IRMA flow, as the user didn't select any Yes option.
                response = {};
            }
            if (response) {
                dispatch({
                    type: 'setResult',
                    payload: {
                        mobilenumber: response['mobilenumber'],
                        email: response['email']
                    }
                });
            } else {
                dispatch({ type: 'setError' });
            }
            window.scrollTo(0, 0);
            startUsabillaSurvey();
        }
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
        if (state.hasResult) {
            setHeaderImg({
                filename: content.responsiveImages.demo5.headerResult.src,
                alt: content.responsiveImages.demo5.headerResult.alt
            });
        }
    }, [state.hasResult]);

    // Determine if we are using the IRMA flow (e.g. user has selected at least one of both options)
    const noIRMAFlow = state.optionEmail === false && state.optionPhone === false;

    return (
        <PageTemplate>
            <ContentBlock>
                <CredentialSelector credentialSource={credentialSource} setCredentialSource={setCredentialSource} />

                {!state.hasResult && !state.hasError && <DemoNotification />}
                <ReactMarkDown
                    source={content.demo5.breadcrumbs}
                    renderers={{ list: BreadCrumbs, listItem: BreadCrumbs.Item }}
                />

                <ReactMarkDown
                    source={content.demo5[state.hasResult ? 'proven' : 'unproven'].title}
                    renderers={{ heading: AscLocal.H1 }}
                />

                {state.hasResult && !noIRMAFlow && !state.hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.SUCCESS}
                        icon={<Checkmark />}
                        iconSize={14}
                        content={
                            content.demo5.proven[
                                `alert${state.mobilenumber ? 'Phone' : ''}${state.email ? 'Email' : ''}`
                            ].body
                        }
                        heading={
                            content.demo5.proven[
                                `alert${state.mobilenumber ? 'Phone' : ''}${state.email ? 'Email' : ''}`
                            ].title
                        }
                        dataTestId="hasResultAlert"
                    />
                )}

                {state.hasResult && noIRMAFlow && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<AlertIcon />}
                        iconSize={22}
                        heading={content.demo5.proven.alertNone.title}
                        content={content.demo5.proven.alertNone.body}
                        dataTestId="hasNoIrmaFlowAlert"
                    />
                )}

                {state.hasError && (
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
            {!state.hasResult && !state.hasError && (
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
                                    heading: AscLocal.H3,
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
                            <ReactMarkDown source={content.demo5.form.title} renderers={{ heading: AscLocal.H3 }} />

                            <AscLocal.CroppedAlert
                                color={AscLocal.AlertColor.PRIMARY}
                                iconUrl="assets/icon-info.svg"
                                iconSize={14}
                                heading={content.demo5.unproven.alert.title}
                                content={content.demo5.unproven.alert.body}
                            />

                            <Demo5Form
                                errors={state.formErrors}
                                forwardRef={formRef}
                                validateForm={validateForm}
                                updateLocationCallback={updateLocationCallback}
                            />

                            <ReactMarkDown
                                source={
                                    noIRMAFlow
                                        ? content.demo5.unproven.callToActionNoIRMA
                                        : content.demo5.unproven.callToAction
                                }
                                renderers={{
                                    heading: AscLocal.H3,
                                    paragraph: AscLocal.Paragraph
                                }}
                            />
                            {noIRMAFlow ? (
                                <StyledButton
                                    data-testid={'noIRMAbutton'}
                                    onClick={getSession}
                                    variant="secondary"
                                    iconSize={24}
                                    iconLeft={<AscLocal.IrmaLogoIcon />}
                                >
                                    {content.demo5.buttonNoIRMA}
                                </StyledButton>
                            ) : (
                                <QRCode getSession={getSession} label={content.demo5.button} />
                            )}

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
            )}
            {(state.hasResult || state.hasError) && (
                <>
                    <ContentBlock>
                        <ReactMarkDown
                            source={content.demo5.result.intro}
                            renderers={{ heading: AscLocal.H3, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                        />
                        <AscLocal.TintedContainerLevel2>
                            <ReactMarkDown
                                source={content.demo5.result.yourReportBeforeMap.replace(/\[(.*?)\]/gm, replaceVars)}
                                renderers={{
                                    heading: AscLocal.H3,
                                    list: AscLocal.UL,
                                    ...AscLocal.DefinitionList
                                }}
                                plugins={[deflist]}
                            />
                            {/* <Map data-testid="map">
                                {state.location.latLng && <Marker latLng={state.location.latLng} />}
                                <BaseLayer />
                            </Map> */}
                            <ReactMarkDown
                                source={content.demo5.result.yourReportAfterMap.replace(/\[(.*?)\]/gm, replaceVars)}
                                renderers={{
                                    heading: AscLocal.H3,
                                    list: AscLocal.UL,
                                    ...AscLocal.DefinitionList
                                }}
                                plugins={[deflist]}
                            />
                        </AscLocal.TintedContainerLevel2>

                        <ReactMarkDown
                            source={!state.hasError ? '' : content.demo5.result.disclaimerError}
                            renderers={{ paragraph: AscLocal.Paragraph }}
                        />
                    </ContentBlock>
                    <EmphasisBlock>
                        <ContentBlock>
                            <ReactMarkDown
                                source={!state.hasError ? content.demo5.result.rest : content.demo5.result.restError}
                                renderers={{
                                    heading: AscLocal.H3,
                                    paragraph: AscLocal.Paragraph,
                                    list: AscLocal.UL,
                                    link: AscLocal.InlineLink
                                }}
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

const StyledButton = styled(Button)`
    margin: ${themeSpacing(0, 6, 6, 0)};
`;

export default Demo5;
