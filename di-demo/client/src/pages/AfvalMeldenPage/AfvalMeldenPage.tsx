import React from 'react';
import { CompactThemeProvider } from '@datapunt/asc-ui';
import WizardStep1 from './WizardStep1';
import AfvalMeldenContext, { IStateType } from './AfvalMeldenContext';
import WizardStep2 from './WizardStep2';
import WizardStep3 from './WizardStep3';
import WizardStep4 from './WizardStep4';
import useWizardLogic from './useWizardLogic';

const AfvalMeldenPage: React.FC = () => {
  const { step, gotoStep }: IStateType = useWizardLogic();
  return (
    <CompactThemeProvider>
      <AfvalMeldenContext.Provider value={{ step, gotoStep }}>
        <WizardStep1 />
        <WizardStep2 />
        <WizardStep3 />
        <WizardStep4 />
      </AfvalMeldenContext.Provider>
    </CompactThemeProvider>
  );
};

export default AfvalMeldenPage;
