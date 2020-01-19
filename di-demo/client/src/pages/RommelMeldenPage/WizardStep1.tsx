import React, { useContext } from "react";
import { PageWrapper } from "../../AppStyle";
import { useParams } from "react-router-dom";
import Radio, { RadioGroup } from "../../shared/components/Radio";
import TextArea from "../../shared/components/TextArea";
import Label from "../../shared/components/Label";
import {
  Paragraph,
  Heading,
  styles,
  themeSpacing,
  TopBar,
  Button,
  themeColor
} from "@datapunt/asc-ui";
import styled from "@datapunt/asc-core";
import RommelMeldenContext, { SET_STEP } from "./RomelMeldenContext";

interface ParagraphProps {
  maxWidth?: number;
}

const StyledParagraph = styled(Paragraph)<ParagraphProps>`
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}px`};
  margin-bottom: ${themeSpacing(9)};

  & > ${styles.HeadingStyle} {
    text-align: left;
    margin-bottom: ${themeSpacing(1)};
  }
`;

const FormStyle = styled.form`
  position: absolute;
  top: 715px;
  /* this forces covering the image items */
  background-color: rgba(255, 255, 255, 1);
  width: 360px;
  margin: ${themeSpacing(2)};
`;

const StyledTopBar = styled(TopBar)`
  margin: ${themeSpacing(16, 6, 4, 0)};
  background-color: ${themeColor("tint", "level3")};
  flex-direction: row-reverse;
  padding: ${themeSpacing(1)};
`;

const WizardStep1: React.FC = () => {
  const { theme } = useParams();
  const { state, dispatch } = useContext(RommelMeldenContext);
  const { step } = state;

  const nextStep:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined = event => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: SET_STEP, payload: 2 });
  };

  return step === 1 ? (
    <PageWrapper maxWidth={360}>
      <img
        alt="Rommel Melden"
        src={`/assets/theme/${theme}/rommelmelden.png`}
        height="1566"
        width="360"
        decoding="async"
      />
      <FormStyle>
        <StyledParagraph maxWidth={340}>
          <Heading as="h4">Waar gaat het om?</Heading>
          <TextArea rows={6}></TextArea>
        </StyledParagraph>

        <StyledParagraph>
          <Heading as="h4">Geef het tijdstrip aan</Heading>
          <RadioGroup name="group-1" onChange={() => {}}>
            <Label htmlFor="nu" label="Nu">
              <Radio id="nu" value="nu" />
            </Label>
            <Label htmlFor="eerder" label="Eerder">
              <Radio id="eerder" value="eerder" />
            </Label>
          </RadioGroup>
        </StyledParagraph>

        <StyledParagraph maxWidth={280}>
          <Heading as="h4">
            Wilt u een bericht ontvangen als uw melding is opgelost?
          </Heading>
          <RadioGroup name="group-2" onChange={() => {}}>
            <Label htmlFor="ja" label="Ja">
              <Radio id="ja" value="ja" />
            </Label>
            <Label htmlFor="nee" label="Nee">
              <Radio id="nee" value="nee" />
            </Label>
          </RadioGroup>
        </StyledParagraph>

        <StyledTopBar>
          <Button
            variant="secondary"
            taskflow
            aria-label="Volgende"
            onClick={nextStep}
          >
            Volgende
          </Button>
        </StyledTopBar>
      </FormStyle>
    </PageWrapper>
  ) : null;
};

export default WizardStep1;
