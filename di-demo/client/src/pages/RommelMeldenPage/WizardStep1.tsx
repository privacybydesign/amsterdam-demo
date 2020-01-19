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
import RommelMeldenContext from "./RomelMeldenContext";

interface FormControlProps {
  maxWidth?: number;
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
  background-color: ${themeColor("tint", "level3")};
  flex-direction: row-reverse;
  padding: ${themeSpacing(2)};
`;

const WizardStep1: React.FC = () => {
  const { theme } = useParams();
  const { step, gotoStep } = useContext(RommelMeldenContext);

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
        <FormControlStyle maxWidth={340}>
          <Heading as="h4">Waar gaat het om?</Heading>
          <TextArea rows={6}></TextArea>
        </FormControlStyle>

        <FormControlStyle>
          <Heading as="h4">Geef het tijdstrip aan</Heading>
          <RadioGroup name="group-1" onChange={() => {}}>
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
          <RadioGroup name="group-2" onChange={() => {}}>
            <Label htmlFor="ja" label="Ja">
              <Radio id="ja" value="ja" />
            </Label>
            <Label htmlFor="nee" label="Nee">
              <Radio id="nee" value="nee" />
            </Label>
          </RadioGroup>
        </FormControlStyle>

        <StyledTopBar>
          <Button
            variant="secondary"
            taskflow
            aria-label="Volgende"
            onClick={e => gotoStep(e, 2)}
          >
            Volgende
          </Button>
        </StyledTopBar>
      </FormStyle>
    </PageWrapper>
  ) : null;
};

export default WizardStep1;
