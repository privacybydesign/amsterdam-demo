import React, { useContext, useState, useEffect } from 'react';
import { PageWrapper } from '../../AppStyle';
import { useParams } from 'react-router-dom';
import AfvalMeldenContext from './AfvalMeldenContext';
import { ButtonStyleProps } from '../../shared/components/Button/ButtonStyle';
import Button from '../../shared/components/Button/Button';
import { createIrmaSession } from '../../services/di';

const loginButtonPosition: ButtonStyleProps = {
  width: 224,
  height: 61,
  top: 364,
  left: 17,
};

const detailButtonPosition: ButtonStyleProps = {
  width: 348,
  height: 37,
  top: 272,
  left: 6,
};

const homeButtonPosition: ButtonStyleProps = {
  width: 360,
  height: 112,
  top: 0,
  left: 0,
};

const WizardStep2: React.FC = () => {
  const { theme } = useParams();
  const { step, gotoStep } = useContext(AfvalMeldenContext);
  const [sending, setSending] = useState(false);

  const send = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSending(true);
  };

  useEffect(() => {
    if (sending) {
      (async () => {
        const identifier = await createIrmaSession('email', 'irma-qr');
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
      <Button onClick={e => gotoStep(e, 1)} {...homeButtonPosition}></Button>
      <Button onClick={e => gotoStep(e, 3)} {...detailButtonPosition}></Button>
      <Button onClick={send} {...loginButtonPosition}></Button>
      {sending && <canvas id="irma-qr"></canvas>}
    </PageWrapper>
  ) : null;
};

export default WizardStep2;
