import React from 'react';
import styled from 'styled-components';
import content from '@services/content';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { themeSpacing, RadioGroup, Label, Radio } from '@datapunt/asc-ui';

export enum FormFields {
    LOCATION = 'location',
    REPORT = 'report',
    OPTION_PHONE = 'optionPhone',
    OPTION_EMAIL = 'optionEmail'
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
                    source={content.demo5.form.optionPhone.label}
                    renderers={{ heading: AscLocal.H4, paragraph: AscLocal.Paragraph }}
                />
                <RadioGroup name={FormFields.OPTION_PHONE} error={errors.includes(FormFields.OPTION_PHONE)}>
                    <Label htmlFor="phoneConsentYes" label={content.demo5.form.optionPhone.optionYes}>
                        <Radio
                            id="phoneConsentYes"
                            variant="primary"
                            value={content.demo5.form.optionPhone.optionYes}
                        />
                    </Label>
                    <Label htmlFor="phoneConsentNo" label={content.demo5.form.optionPhone.optionNo}>
                        <Radio id="phoneConsentNo" variant="primary" value={content.demo5.form.optionPhone.optionNo} />
                    </Label>
                </RadioGroup>
                {errors.includes(FormFields.OPTION_PHONE) && (
                    <AscLocal.ErrorMessage message={content.demo5.form.optionPhone.required} />
                )}
            </FormSection>

            {/* // Updates */}
            <FormSection>
                <ReactMarkDown
                    source={content.demo5.form.optionEmail.label}
                    renderers={{ heading: AscLocal.H4, paragraph: AscLocal.Paragraph }}
                />
                <RadioGroup name={FormFields.OPTION_EMAIL} error={errors.includes(FormFields.OPTION_EMAIL)}>
                    <Label htmlFor="updatesYes" label={content.demo5.form.optionEmail.optionYes}>
                        <Radio id="updatesYes" variant="primary" value={content.demo5.form.optionEmail.optionYes} />
                    </Label>
                    <Label htmlFor="updatesNo" label={content.demo5.form.optionEmail.optionNo}>
                        <Radio id="updatesNo" variant="primary" value={content.demo5.form.optionEmail.optionNo} />
                    </Label>
                </RadioGroup>
                {errors.includes(FormFields.OPTION_EMAIL) && (
                    <AscLocal.ErrorMessage message={content.demo5.form.optionEmail.required} />
                )}
            </FormSection>
        </form>
    );
};

const FormSection = styled.div`
    margin-bottom: ${themeSpacing(6)};
`;

export default Demo5Form;
