import React, { useReducer, useMemo, useCallback } from 'react';
import { IStateType, afvalMeldenReducer, SET_STEP } from './AfvalMeldenContext';

type useWizardLogicType = () => IStateType;

const useWizardLogic: useWizardLogicType = () => {
  const [state, dispatch] = useReducer(afvalMeldenReducer, { step: 1 });

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
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    dispatch({ type: SET_STEP, payload: step });
  }, []);

  return {
    step: contextValue.state.step,
    gotoStep,
  };
};

export default useWizardLogic;
