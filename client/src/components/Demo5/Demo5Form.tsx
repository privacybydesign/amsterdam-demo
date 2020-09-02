import React from 'react';
import styled from 'styled-components';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { themeSpacing, RadioGroup, Label, Radio } from '@datapunt/asc-ui';

export enum FormFields {
    LOCATION = 'location',
    REPORT = 'report',
    PHONE_CONSENT = 'phoneConsent',
    UPDATES = 'updates'
}

export interface IProps {
    errors?: string[];
    forwardRef: React.MutableRefObject<HTMLFormElement>;
}

const Demo5Form: React.FC<IProps> = ({ errors, forwardRef }) => {
    return (
        <form ref={forwardRef}>
            {/* // Location */}
            <FormSection>
                <ReactMarkDown
                    source={content.demo5.form.location.label}
                    renderers={{ heading: AscLocal.H4, paragraph: AscLocal.Paragraph }}
                />
                {/* // TODO: Include map here */}
                {errors.includes(FormFields.LOCATION) && (
                    <AscLocal.ErrorMessage message={content.demo5.form.location.required} />
                )}
            </FormSection>

            {/* // Report */}
            <FormSection>
                <ReactMarkDown
                    source={content.demo5.form.report.label}
                    renderers={{ heading: AscLocal.H4, paragraph: AscLocal.Paragraph }}
                />
                <AscLocal.TextArea
                    id={FormFields.REPORT}
                    error={errors.includes(FormFields.REPORT)}
                    maxLength={1000}
                    showCounter={true}
                />
                {errors.includes(FormFields.REPORT) && (
                    <AscLocal.ErrorMessage message={content.demo5.form.report.required} />
                )}
            </FormSection>

            {/* // Phone consent */}
            <FormSection>
                <ReactMarkDown
                    source={content.demo5.form.phoneConsent.label}
                    renderers={{ heading: AscLocal.H4, paragraph: AscLocal.Paragraph }}
                />
                <RadioGroup name={FormFields.PHONE_CONSENT} error={errors.includes(FormFields.PHONE_CONSENT)}>
                    <Label htmlFor="phoneConsentYes" label={content.demo5.form.phoneConsent.optionYes}>
                        <Radio
                            id="phoneConsentYes"
                            variant="primary"
                            value={content.demo5.form.phoneConsent.optionYes}
                        />
                    </Label>
                    <Label htmlFor="phoneConsentNo" label={content.demo5.form.phoneConsent.optionNo}>
                        <Radio id="phoneConsentNo" variant="primary" value={content.demo5.form.phoneConsent.optionNo} />
                    </Label>
                </RadioGroup>
                {errors.includes(FormFields.PHONE_CONSENT) && (
                    <AscLocal.ErrorMessage message={content.demo5.form.phoneConsent.required} />
                )}
            </FormSection>

            {/* // Updates */}
            <FormSection>
                <ReactMarkDown
                    source={content.demo5.form.updates.label}
                    renderers={{ heading: AscLocal.H4, paragraph: AscLocal.Paragraph }}
                />
                <RadioGroup name={FormFields.UPDATES} error={errors.includes(FormFields.UPDATES)}>
                    <Label htmlFor="updatesYes" label={content.demo5.form.updates.optionYes}>
                        <Radio id="updatesYes" variant="primary" value={content.demo5.form.updates.optionYes} />
                    </Label>
                    <Label htmlFor="updatesNo" label={content.demo5.form.updates.optionNo}>
                        <Radio id="updatesNo" variant="primary" value={content.demo5.form.updates.optionNo} />
                    </Label>
                </RadioGroup>
                {errors.includes(FormFields.UPDATES) && (
                    <AscLocal.ErrorMessage message={content.demo5.form.updates.required} />
                )}
            </FormSection>
        </form>
    );
};

const FormSection = styled.div`
    margin-bottom: ${themeSpacing(6)};
`;

export default Demo5Form;
