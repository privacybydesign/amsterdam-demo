import React, { useCallback } from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { themeSpacing, RadioGroup, Label, Radio } from '@amsterdam/asc-ui';
import MapComponent from '@components/Map/Map';
import { ILocation } from '@components/Map/reducer';
import { useContent } from '@services/ContentProvider';

export enum FormFields {
    LOCATION = 'location',
    REPORT = 'report',
    OPTION_PHONE = 'optionPhone',
    OPTION_EMAIL = 'optionEmail'
}

export interface IProps {
    errors?: string[];
    forwardRef: React.MutableRefObject<HTMLFormElement>;
    validateForm: (setErrors: boolean) => unknown;
    updateLocationCallback: (location: ILocation) => void;
}

const Demo5Form: React.FC<IProps> = ({ errors, forwardRef, validateForm, updateLocationCallback }) => {
    const content = useContent();
    const validateOnChange = useCallback(() => validateForm(false), [validateForm]);
    const onSubmit = useCallback(event => event.preventDefault(), []);

    return (
        <form ref={forwardRef} onSubmit={onSubmit}>
            {/* // Location */}
            <FormSection>
                <ReactMarkDown
                    source={content.demo5.form.location.label}
                    renderers={{ heading: AscLocal.H3, paragraph: AscLocal.Paragraph }}
                />
                <MapComponent updateLocationCallback={updateLocationCallback} />
                {errors && errors.includes(FormFields.LOCATION) && (
                    <AscLocal.ErrorMessage message={content.demo5.form.location.required} />
                )}
            </FormSection>

            {/* // Report */}
            <FormSection>
                <ReactMarkDown
                    source={content.demo5.form.report.label}
                    renderers={{ heading: AscLocal.H3, paragraph: AscLocal.Paragraph }}
                />
                <AscLocal.TextArea
                    id={FormFields.REPORT}
                    error={errors && errors.includes(FormFields.REPORT)}
                    maxLength={1000}
                    showCounter={true}
                    data-testid="report"
                    aria-label={content.demo5.form.report.ariaLabel}
                />
                {errors && errors.includes(FormFields.REPORT) && (
                    <AscLocal.ErrorMessage message={content.demo5.form.report.required} />
                )}
            </FormSection>

            {/* // Phone consent */}
            <FormSection>
                <AscLocal.Fieldset>
                    <legend>
                        <StyledH3>{content.demo5.form.optionPhone.label}</StyledH3>
                    </legend>
                    <ReactMarkDown
                        source={content.demo5.form.optionPhone.remark}
                        renderers={{ paragraph: AscLocal.Paragraph }}
                    />
                    <RadioGroup
                        name={FormFields.OPTION_PHONE}
                        error={errors && errors.includes(FormFields.OPTION_PHONE)}
                        onChange={validateOnChange}
                    >
                        <Label htmlFor="optionMobileNumberYes" label={content.demo5.form.optionPhone.optionYes}>
                            <Radio
                                id="optionMobileNumberYes"
                                data-testid="optionMobileNumberYes"
                                value={content.demo5.form.optionPhone.optionYes}
                            />
                        </Label>
                        <Label htmlFor="optionMobileNumberNo" label={content.demo5.form.optionPhone.optionNo}>
                            <Radio
                                id="optionMobileNumberNo"
                                data-testid="optionMobileNumberNo"
                                value={content.demo5.form.optionPhone.optionNo}
                            />
                        </Label>
                    </RadioGroup>
                    {errors && errors.includes(FormFields.OPTION_PHONE) && (
                        <AscLocal.ErrorMessage message={content.demo5.form.optionPhone.required} />
                    )}
                </AscLocal.Fieldset>
            </FormSection>

            {/* // Updates */}
            <FormSection>
                <AscLocal.Fieldset>
                    <legend>
                        <StyledH3>{content.demo5.form.optionEmail.label}</StyledH3>
                    </legend>
                    <ReactMarkDown
                        source={content.demo5.form.optionEmail.remark}
                        renderers={{ paragraph: AscLocal.Paragraph }}
                    />
                    <RadioGroup
                        name={FormFields.OPTION_EMAIL}
                        error={errors && errors.includes(FormFields.OPTION_EMAIL)}
                        onChange={() => validateForm(false)}
                    >
                        <Label htmlFor="optionEmailYes" label={content.demo5.form.optionEmail.optionYes}>
                            <Radio
                                id="optionEmailYes"
                                data-testid="optionEmailYes"
                                value={content.demo5.form.optionEmail.optionYes}
                            />
                        </Label>
                        <Label htmlFor="optionEmailNo" label={content.demo5.form.optionEmail.optionNo}>
                            <Radio
                                id="optionEmailNo"
                                data-testid="optionEmailNo"
                                value={content.demo5.form.optionEmail.optionNo}
                            />
                        </Label>
                    </RadioGroup>
                    {errors && errors.includes(FormFields.OPTION_EMAIL) && (
                        <AscLocal.ErrorMessage message={content.demo5.form.optionEmail.required} />
                    )}
                </AscLocal.Fieldset>
            </FormSection>
        </form>
    );
};

const FormSection = styled.div`
    margin-bottom: ${themeSpacing(6)};
`;

const StyledH3 = styled.h3`
    margin: 0;
`;

export default Demo5Form;
