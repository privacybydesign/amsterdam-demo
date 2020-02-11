import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../AppStyle';
import AfvalMeldenContext from './AfvalMeldenContext';
import Button from '../../shared/components/Button/Button';
import { ButtonStyleProps } from '../../shared/components/Button/ButtonStyle';

const homeButtonPosition: ButtonStyleProps = {
  width: 360,
  height: 112,
  top: 0,
  left: 0,
};

const WizardStep4: React.FC = () => {
  const { theme } = useParams();
  const { step, gotoStep } = useContext(AfvalMeldenContext);

  return step === 4 ? (
    <>
      <img
        alt="Rommel Melden"
        src={`/assets/theme/${theme}/rommelmelden-step4.png`}
        height="620"
        width="360"
        decoding="async"
      />
      <Button onClick={e => gotoStep(e, 1)} {...homeButtonPosition} />
    </>
  ) : null;
};

export default WizardStep4;
