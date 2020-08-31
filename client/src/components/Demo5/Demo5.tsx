import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion, themeSpacing } from '@datapunt/asc-ui';
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
import { reducer, initialState } from './reducer';
import Demo5Form, { FormFields } from './Demo5Form';

export interface IProps {}

const Demo5: React.FC<IProps> = () => {
    const [credentialSource, setCredentialSource] = useState(CredentialSource.DEMO);
    const [state, dispatch] = useReducer(reducer, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    // Form validator (uncontrolled)
    const validateForm = useCallback(() => {
        const formErrors = [];

        // TODO: Include location
        const location = '';

        const report = (formRef.current.querySelector(`#${FormFields.REPORT}`) as HTMLTextAreaElement).value;
        if (!report.length) {
            formErrors.push(FormFields.REPORT);
        }

        const phoneConsent = formRef.current.querySelector(`input[name=${FormFields.PHONE_CONSENT}]:checked`)
            ? true
            : false;
        if (!phoneConsent) {
            formErrors.push(FormFields.PHONE_CONSENT);
        }

        const updates = formRef.current.querySelector(`input[name=${FormFields.UPDATES}]:checked`) ? true : false;
        if (!updates) {
            formErrors.push(FormFields.UPDATES);
        }

        dispatch({
            type: 'validateForm',
            payload: { location, report, phoneConsent, updates, formErrors }
        });
        return !formErrors.length;
    }, []);

    // IRMA session
    const getSession = async () => {
        let response = null;
        if (validateForm()) {
            response = await createIrmaSession('demo5', 'irma-qr', credentialSource === CredentialSource.DEMO);
            if (response) {
                dispatch({
                    type: 'setResult',
                    payload: {
                        phone: response['mobilenumber'],
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
                filename: content.responsiveImages.demo3.headerResult.src,
                alt: content.responsiveImages.demo3.headerResult.alt
            });
        }
    }, [state.hasResult]);

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

                {state.hasResult && !state.hasError && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.SUCCESS}
                        icon={<Checkmark />}
                        iconSize={14}
                        heading={content.demo5.proven.alert.title}
                        content={content.demo5.proven.alert.body.replace(/\[\]/, name)}
                        dataTestId="hasResultAlert"
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

            {!state.hasResult ? (
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

                            <CroppedAlert
                                color={AscLocal.AlertColor.PRIMARY}
                                iconUrl="assets/icon-info.svg"
                                iconSize={14}
                                heading={content.demo5.unproven.alert.title}
                                content={content.demo5.unproven.alert.body}
                            />

                            <Demo5Form errors={state.formErrors} forwardRef={formRef} />

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
                                    heading: AscLocal.H3,
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
                                heading: AscLocal.H3,
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

const CroppedAlert = styled(AscLocal.Alert)`
    padding: ${themeSpacing(2)};

    h3,
    p {
        margin-bottom: 0;
    }

    p {
        margin-top: ${themeSpacing(1)};
    }
`;

export default Demo5;
