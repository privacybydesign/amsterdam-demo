import React, { useState, useEffect, useRef, useReducer } from 'react';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Accordion } from '@datapunt/asc-ui';
import { Checkmark, Alert } from '@datapunt/asc-assets';
import CredentialSelector, { CredentialSource } from '@components/CredentialSelector/CredentialSelector';
import ExternalLink from '@components/ExternalLink/ExternalLink';
import PageTemplate from '@components/PageTemplate/PageTemplate';
import BreadCrumbs from '@components/BreadCrumbs';
import DemoNotification from '@components/DemoNotification/DemoNotification';
import HeaderImage, { IHeaderImageProps } from '@components/HeaderImage/HeaderImage';
import { RadioGroup, Label, Radio } from '@datapunt/asc-ui';
import QRCode from '@components/QRCode/QRCode';
import { initialState, reducer } from './reducer';
import ContentBlock from '@components/ContentBlock/ContentBlock';
import preloadDemoImages from '@services/preloadImages';
import EmphasisBlock from '@components/EmphasisBlock/EmphasisBlock';
import { startSurvey as startUsabillaSurvey } from '@services/usabilla';

export interface IProps {}

const Demo4: React.FC<IProps> = () => {
    const formEl = useRef(null);

    const [credentialSource, setCredentialSource] = useState(CredentialSource.DEMO);
    const [state, dispatch] = useReducer(reducer, initialState);

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
                        street: `${response['street']} ${response['houseNumber']}`,
                        city: `${response['zipcode']} ${response['city']}`,
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

    const { hasResult, hasError, formValid } = state;

    function replaceVars(str, p1) {
        return state[p1] || '-';
    }

    // Update header image
    useEffect(() => {
        if (hasResult) {
            setHeaderImg({
                filename: content.responsiveImages.demo4.headerResult.src,
                alt: content.responsiveImages.demo4.headerResult.alt
            });
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

                {hasResult && !hasError && (
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
                </AscLocal.Row>
            ) : (
                <>
                    <ContentBlock>
                        <AscLocal.TintedContainerLevel3>
                            <ReactMarkDown
                                source={content.demo4.result.yourDemoRequest.replace(/\[(.*?)\]/gm, replaceVars)}
                                renderers={{ heading: AscLocal.H3, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                            />
                        </AscLocal.TintedContainerLevel3>

                        <AscLocal.TintedContainerLevel3>
                            <ReactMarkDown
                                source={content.demo4.result.yourDetails.replace(/\[(.*?)\]/gm, replaceVars)}
                                renderers={{ heading: AscLocal.H3, paragraph: AscLocal.Paragraph, list: AscLocal.UL }}
                            />
                        </AscLocal.TintedContainerLevel3>

                        <ReactMarkDown source={content.noSavePromise} />
                        <ReactMarkDown source={content.demo4.result.disclaimer} />
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
