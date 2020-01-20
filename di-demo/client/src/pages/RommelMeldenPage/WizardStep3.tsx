import React, { useContext, useState, useEffect } from "react";
import { PageWrapper } from "../../AppStyle";
import { useParams } from "react-router-dom";
import RommelMeldenContext from "./RomelMeldenContext";
import { ButtonStyleProps } from "../../shared/components/Button/ButtonStyle";
import Button from "../../shared/components/Button/Button";
import { createIrmaSession } from "../../services/di";

const loginButtonPosition: ButtonStyleProps = {
  width: 224,
  height: 65,
  top: 597,
  left: 15
};

const detailButtonPosition: ButtonStyleProps = {
  width: 348,
  height: 218,
  top: 320,
  left: 6
};

const homeButtonPosition: ButtonStyleProps = {
  width: 360,
  height: 112,
  top: 0,
  left: 0
};

const WizardStep3: React.FC = () => {
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

  return step === 3 ? (
    <PageWrapper maxWidth={360}>
      <img
        alt="Rommel Melden"
        src={`/assets/theme/${theme}/rommelmelden-step3.png`}
        height="1188"
        width="360"
        decoding="async"
      />
      <Button onClick={e => gotoStep(e, 1)} {...homeButtonPosition}></Button>
      <Button onClick={e => gotoStep(e, 2)} {...detailButtonPosition}></Button>
      <Button onClick={send} {...loginButtonPosition}></Button>
      {sending && <canvas id="irma-qr"></canvas>}
    </PageWrapper>
  ) : null;
};

export default WizardStep3;
