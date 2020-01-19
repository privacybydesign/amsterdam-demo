import React, { useContext, useState, useEffect } from "react";
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
  themeColor
} from "@datapunt/asc-ui";
import styled from "@datapunt/asc-core";
import RommelMeldenContext from "./RomelMeldenContext";
import { ButtonStyleProps } from "../../shared/components/Button/ButtonStyle";
import Button from "../../shared/components/Button/Button";
import { createIrmaSession } from "../../services/di";
import { QRModal } from "../../shared/components/Modal/QRModal";

const loginButtonPosition: ButtonStyleProps = {
  width: 224,
  height: 61,
  top: 414,
  left: 17
};

const detailButtonPosition: ButtonStyleProps = {
  width: 348,
  height: 37,
  top: 320,
  left: 6
};

const WizardStep2: React.FC = () => {
  const { theme } = useParams();
  const { step, gotoStep } = useContext(RommelMeldenContext);
  const [sending, setSending] = useState(false);

  const send = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSending(true);
  };

  useEffect(() => {
    if (sending) {
      (async () => {
        const identifier = await createIrmaSession("email", "irma-qr");
        setSending(false);
        gotoStep(null, 4);
      })();
    }
  }, [sending]);

  return step === 2 ? (
    <PageWrapper maxWidth={360}>
      <img
        alt="Rommel Melden"
        src={`/assets/theme/${theme}/rommelmelden-step2.png`}
        height="1009"
        width="360"
        decoding="async"
      />
      <Button
        onClick={e => gotoStep(e, 3)}
        {...detailButtonPosition}
      ></Button>
      <Button onClick={send} {...loginButtonPosition}></Button>
      {sending && <canvas id="irma-qr"></canvas>}
    </PageWrapper>
  ) : null;
};

export default WizardStep2;
