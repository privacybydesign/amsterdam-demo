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

const WizardStep4: React.FC = () => {
  const { theme } = useParams();
  const { state } = useContext(RommelMeldenContext);

  const { step } = state;

  return step === 4 ? (
    <PageWrapper maxWidth={360}>
      <img
        alt="Rommel Melden"
        src={`/assets/theme/${theme}/rommelmelden-step4.png`}
        height="620"
        width="360"
        decoding="async"
      />
    </PageWrapper>
  ) : null;
};

export default WizardStep4;
