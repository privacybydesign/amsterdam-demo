import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Heading,
  styles,
  themeSpacing,
  TopBar,
  Button,
  themeColor,
  Radio,
  RadioGroup,
  Label,
} from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import TextArea from '../../shared/components/TextArea';
import AfvalMeldenContext from './AfvalMeldenContext';

interface FormControlProps {
  maxWidth?: number;
}

interface FormValue {
  description?: string;
  time?: string;
  whishUpdates?: boolean;
}

const FormControlStyle = styled.div<FormControlProps>`
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}px`};
  margin-bottom: ${themeSpacing(10)};

  & > ${styles.HeadingStyle} {
    text-align: left;
    margin-bottom: ${themeSpacing(1)};
  }
`;

const FormStyle = styled.form`
  position: absolute;
  top: 720px;
  /* this forces covering the image items in the background */
  background-color: rgba(255, 255, 255, 1);
  width: 360px;
  margin: ${themeSpacing(2)};
`;

const StyledTopBar = styled(TopBar)`
  margin: ${themeSpacing(17, 6, 4, 0)};
  background-color: ${themeColor('tint', 'level3')};
  flex-direction: row-reverse;
  padding: ${themeSpacing(2)};
  min-height: 44px;
`;

const WizardStep1: React.FC = () => {
  const { theme } = useParams();
  const { step, gotoStep } = useContext(AfvalMeldenContext);
  const [formValue, setFormValue] = useState<FormValue>({});

  useEffect(() => {
    setFormValue({});
  }, []);

  const isFormValid = () => {
    const { description, time, whishUpdates } = formValue;
    return description && time && whishUpdates !== undefined;
  };

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (formValue.whishUpdates) {
      gotoStep(e, 2);
    } else {
      gotoStep(e, 4);
    }
  };

  const updateFormValue = (name: string, value: string | boolean) => {
    setFormValue({ ...formValue, [name]: value });
  };

  return step === 1 ? (
    <>
      <img
        alt="Rommel Melden"
        src={`/assets/theme/${theme}/rommelmelden.png`}
        height="1566"
        width="360"
        decoding="async"
      />
      <FormStyle>
        <FormControlStyle maxWidth={340}>
          <Heading as="h4">Waar gaat het om?</Heading>
          <TextArea
            rows={6}
            onChange={e =>
              updateFormValue('description', e.currentTarget.value)
            }
          />
        </FormControlStyle>

        <FormControlStyle>
          <Heading as="h4">Geef het tijdstip aan</Heading>
          <RadioGroup
            name="group-1"
            onChange={(e: any) => {
              updateFormValue('time', e.target.value);
            }}
          >
            <Label htmlFor="nu" label="Nu">
              <Radio id="nu" value="nu" />
            </Label>
            <Label htmlFor="eerder" label="Eerder">
              <Radio id="eerder" value="eerder" />
            </Label>
          </RadioGroup>
        </FormControlStyle>

        <FormControlStyle maxWidth={280}>
          <Heading as="h4">
            Wilt u een bericht ontvangen als uw melding is opgelost?
          </Heading>
          <RadioGroup
            name="group-2"
            onChange={(e: any) => {
              updateFormValue('whishUpdates', e.target.value === 'ja');
            }}
          >
            <Label htmlFor="ja" label="Ja">
              <Radio id="ja" value="ja" />
            </Label>
            <Label htmlFor="nee" label="Nee">
              <Radio id="nee" value="nee" />
            </Label>
          </RadioGroup>
        </FormControlStyle>

        <StyledTopBar>
          {isFormValid() && (
            <Button
              variant="secondary"
              taskflow
              aria-label="Volgende"
              onClick={handleOnClick}
            >
              Volgende
            </Button>
          )}
        </StyledTopBar>
      </FormStyle>
    </>
  ) : null;
};

export default WizardStep1;
