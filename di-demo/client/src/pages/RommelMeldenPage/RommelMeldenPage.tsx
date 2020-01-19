import React, { useReducer, useMemo } from "react";
import { CompactThemeProvider } from "@datapunt/asc-ui";
import WizardStep1 from "./WizardStep1";
import RommelMeldenContext, { rommelMeldenReducer } from "./RomelMeldenContext";
import WizardStep2 from "./WizardStep2";
import WizardStep3 from "./WizardStep3";
import WizardStep4 from "./WizardStep4";

const RommelMeldenPage: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(rommelMeldenReducer, {step: 4});

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  
  console.log(contextValue.state.step);

  return (
    <CompactThemeProvider>
      <RommelMeldenContext.Provider value={contextValue}>
        <WizardStep1 />
        <WizardStep2 />
        <WizardStep3 />
        <WizardStep4 />
      </RommelMeldenContext.Provider>
    </CompactThemeProvider>
  );
};

export default RommelMeldenPage;
