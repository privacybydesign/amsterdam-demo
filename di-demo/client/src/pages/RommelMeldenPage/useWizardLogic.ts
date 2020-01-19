import React, { useReducer, useMemo, useCallback } from "react";
import { IStateType, rommelMeldenReducer, SET_STEP } from "./RomelMeldenContext";

type useWizardLogicType = () => IStateType;

const useWizardLogic: useWizardLogicType = () => {
  const [state, dispatch] = useReducer(rommelMeldenReducer, { step: 1 });

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  const gotoStep:
    | ((
        event:
          | React.MouseEvent<HTMLButtonElement, MouseEvent>
          | null
          | undefined,
        step: number
      ) => void)
    | undefined = useCallback((event, step) => {
    event && event.preventDefault();
    event && event.stopPropagation();
    dispatch({ type: SET_STEP, payload: step });
  }, []);

  return {
    step: contextValue.state.step,
    gotoStep
  };
};

export default useWizardLogic;
