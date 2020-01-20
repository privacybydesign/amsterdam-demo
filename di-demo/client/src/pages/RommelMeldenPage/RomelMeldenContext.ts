import React from "react";

export interface IStateType {
  step: number;
  gotoStep: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    step: number
  ) => void;
}

const defaultState: IStateType = { step: 1, gotoStep: (): void => {} };

const RommelMeldenContext = React.createContext<IStateType>(defaultState);

export const SET_STEP = 'SET_STEP';

export const rommelMeldenReducer = (state, action) => {
  switch (action.type) {
    case SET_STEP:
      return {...state, step: action.payload}
      ;
    default:
      return state;
  }
}

export default RommelMeldenContext;
