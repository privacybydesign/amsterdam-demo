import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';
import { Accordion, themeSpacing, Button } from '@amsterdam/asc-ui';
import { Alert as AlertIcon } from '@amsterdam/asc-assets';
import { Map, BaseLayer, Marker, getCrsRd } from '@amsterdam/arm-core';
import content from '@services/content';
import deflist from '@services/deflist';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import ResponsiveImage, { IHeaderImageProps } from '@components/ResponsiveImage/ResponsiveImage';
import { Checkmark } from '@amsterdam/asc-assets';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import WhyIRMA from '@components/WhyIRMA/WhyIRMA';
import preloadDemoImages from '@services/preloadImages';
import { startSurvey as startUsabillaSurvey } from '@services/usabilla';
import { reducer, initialState, IState } from './reducer';
import Demo5Form, { FormFields } from './Demo5Form';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';
import { SkipLinkEntry } from '@components/SkipLink/SkipLink';
import useIrmaSession, { IIrmaSessionOutputData } from '@hooks/useIrmaSession';
import { isMobile } from '@services/createIrmaSession';

export interface IProps {}

export interface IDemo5Query {
    demo?: boolean;
    phone: boolean;
    email: boolean;
}

const Demo5: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.PRODUCTION);
    const [state, dispatch] = useReducer(reducer, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    function replaceVars(str: string, p1: keyof IState) {
        return state[p1] || null;
    }

    // Form validator (uncontrolled)
    const validateForm = useCallback(
        (setErrors = true) => {
            if (!formRef.current) {
                return;
            }

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
            const optionPhoneChecked: HTMLInputElement | null = formRef.current.querySelector(
                `input[name=${FormFields.OPTION_PHONE}]:checked`
            );
            if (!optionPhoneChecked) {
                formErrors.push(FormFields.OPTION_PHONE);
            } else {
                optionPhone = optionPhoneChecked.value === content.demo5.form.optionPhone.optionYes;
            }

            let optionEmail;
            const optionEmailChecked: HTMLInputElement | null = formRef.current.querySelector(
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

    const updateLocationCallback = useCallback((location: any) => {
        dispatch({
            type: 'setLocation',
            payload: {
                location
            }
        });
    }, []);

    // IRMA session
    // Only use IRMA flow when the user selected the Yes option phone, email or both
    const { modal, startIrmaSession }: IIrmaSessionOutputData = useIrmaSession();

    const getSession = useCallback(
        (event, alwaysShowQRCode = false) => {
            event.persist();
            const validatedForm = validateForm();
            if (validatedForm !== undefined && !validatedForm.errors.length) {
                // Define URL variables based on form input
                const query: IDemo5Query = {
                    phone: Boolean(validatedForm.values.optionPhone),
                    email: Boolean(validatedForm.values.optionEmail)
                };

                startIrmaSession({
                    demoPath: 'demos/demo5',
                    useDemoCredentials: credentialSource === CredentialSource.DEMO,
                    alwaysShowQRCode,
                    resultCallback: async (result: any) => {
                        if (result) {
                            dispatch({
                                type: 'setResult',
                                payload: {
                                    mobilenumber: result['mobilenumber'],
                                    email: result['email']
                                }
                            });
                        } else {
                            dispatch({ type: 'setError' });
                        }
                        window.scrollTo(0, 0);
                        startUsabillaSurvey();
                    },
                    extraQuery: query as any
                });
            }
        },
        [credentialSource, startIrmaSession, validateForm]
    );

    // No IRMA flow, for when the user doesn't select any Yes option.
    const finishSessionWithoutIRMA = useCallback(() => {
        const response: any = null;
        const validatedForm = validateForm();
        if (validatedForm !== undefined && !validatedForm.errors.length) {
            dispatch({
                type: 'setResult',
                payload: {}
            });
            window.scrollTo(0, 0);
            startUsabillaSurvey();
        }

        return response;
    }, [validateForm]);

    // Define dynamic header image
    const [headerImg, setHeaderImg] = useState<IHeaderImageProps>({
        filename: content.responsiveImages.demo5.header.src,
        alt: content.responsiveImages.demo5.header.alt
    });

    // Preload demo images
    useEffect(() => {
        preloadDemoImages(
            Object.keys(content.responsiveImages.demo5).map(key => (content.responsiveImages.demo5 as any)[key].src)
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

                {SkipLinkEntry}
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
                            (content.demo5.proven as any)[
                                `alert${state.mobilenumber ? 'Phone' : ''}${state.email ? 'Email' : ''}`
                            ].body
                        }
                        heading={
                            (content.demo5.proven as any)[
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
            <ResponsiveImage filename={headerImg.filename} alt={headerImg.alt} />
            {!state.hasResult && !state.hasError && (
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
                                    source={content.demo5.unproven.intro1}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        paragraph: AscLocal.Paragraph,
                                        list: AscLocal.UL
                                    }}
                                />
                            </section>
                            <section>
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
                            </section>
                            <section>
                                <ReactMarkDown source={content.demo5.form.title} renderers={{ heading: AscLocal.H2 }} />
                            </section>
                            <section>
                                <AscLocal.CroppedAlert
                                    color={AscLocal.AlertColor.PRIMARY}
                                    iconUrl="assets/icon-info.svg"
                                    iconSize={14}
                                    heading={content.demo5.unproven.alert.title}
                                    content={content.demo5.unproven.alert.body}
                                />
                            </section>
                            <section>
                                <Demo5Form
                                    errors={state.formErrors}
                                    forwardRef={formRef as any}
                                    validateForm={validateForm}
                                    updateLocationCallback={updateLocationCallback}
                                />
                            </section>
                            <section>
                                <ReactMarkDown
                                    source={
                                        noIRMAFlow
                                            ? content.demo5.unproven.callToActionNoIRMA
                                            : content.demo5.unproven.callToAction
                                    }
                                    renderers={{
                                        heading: AscLocal.H2,
                                        paragraph: AscLocal.Paragraph
                                    }}
                                />
                            </section>
                            <section>
                                {noIRMAFlow ? (
                                    <StyledButton
                                        data-testid={'noIRMAbutton'}
                                        onClick={finishSessionWithoutIRMA}
                                        variant="secondary"
                                        iconSize={24}
                                        iconLeft={<AscLocal.IrmaLogoIcon />}
                                    >
                                        {content.demo5.buttonNoIRMA}
                                    </StyledButton>
                                ) : (
                                    <>
                                        <AscLocal.QRCodeButton onClick={getSession}>
                                            {content.demo5.button}
                                        </AscLocal.QRCodeButton>
                                        {modal}
                                    </>
                                )}
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
                        <section>
                            <WhyIRMA />
                        </section>
                    </AscLocal.Column>
                </AscLocal.Row>
            )}
            {(state.hasResult || state.hasError) && (
                <>
                    <ContentBlock>
                        <section>
                            <ReactMarkDown
                                source={content.demo5.result.intro}
                                renderers={{ heading: AscLocal.H2, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                            />
                        </section>
                        <section>
                            <AscLocal.TintedContainerLevel2>
                                <ReactMarkDown
                                    source={content.demo5.result.yourReportBeforeMap.replace(
                                        /\[location\]/gm,
                                        (state.location as any).displayName
                                    )}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        list: AscLocal.UL,
                                        ...AscLocal.DefinitionList
                                    }}
                                    plugins={[deflist]}
                                />
                                {(state.location as any).latLng && (
                                    <StyledMap
                                        options={{
                                            crs: getCrsRd(),
                                            attributionControl: false,
                                            zoomControl: false,
                                            boxZoom: false,
                                            dragging: false,
                                            center: (state.location as any).latLng,
                                            zoom: 13,
                                            keyboard: false,
                                            tap: false,
                                            scrollWheelZoom: false,
                                            touchZoom: false
                                        }}
                                    >
                                        <Marker latLng={(state.location as any).latLng} />
                                        <BaseLayer />
                                    </StyledMap>
                                )}
                                <ReactMarkDown
                                    source={content.demo5.result.yourReportAfterMap.replace(
                                        /\[(.*?)\]/gm,
                                        replaceVars as any
                                    )}
                                    renderers={{
                                        heading: AscLocal.H2,
                                        list: AscLocal.UL,
                                        ...AscLocal.DefinitionList
                                    }}
                                    plugins={[deflist]}
                                />
                                {state.mobilenumber && (
                                    <ReactMarkDown
                                        source={content.demo5.result.yourMobileNumber.replace(
                                            /\[(.*?)\]/gm,
                                            replaceVars as any
                                        )}
                                        renderers={{
                                            heading: AscLocal.H2,
                                            list: AscLocal.UL,
                                            ...AscLocal.DefinitionList
                                        }}
                                        plugins={[deflist]}
                                    />
                                )}
                                {state.email && (
                                    <ReactMarkDown
                                        source={content.demo5.result.yourEmail.replace(
                                            /\[(.*?)\]/gm,
                                            replaceVars as any
                                        )}
                                        renderers={{
                                            heading: AscLocal.H2,
                                            list: AscLocal.UL,
                                            ...AscLocal.DefinitionList
                                        }}
                                        plugins={[deflist]}
                                    />
                                )}
                            </AscLocal.TintedContainerLevel2>
                        </section>
                        <section>
                            <ReactMarkDown
                                source={!state.hasError ? '' : content.demo5.result.disclaimerError}
                                renderers={{ paragraph: AscLocal.Paragraph }}
                            />
                        </section>
                    </ContentBlock>

                    <EmphasisBlock>
                        <ContentBlock>
                            <section>
                                <ReactMarkDown
                                    source={
                                        noIRMAFlow || state.hasError
                                            ? content.demo5.result.restNoIRMA
                                            : content.demo5.result.rest
                                    }
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
                    <ContentBlock>
                        <section>
                            <ReactMarkDown source={content.callToAction} />
                        </section>
                    </ContentBlock>
                </>
            )}
        </PageTemplate>
    );
};

const StyledButton = styled(Button)`
    margin: ${themeSpacing(0, 6, 6, 0)};
`;

const StyledMap = styled(Map)`
    height: 128px;
    width: 100%;
    margin: ${themeSpacing(4)} 0;
    z-index: 0;
`;

export default Demo5;
