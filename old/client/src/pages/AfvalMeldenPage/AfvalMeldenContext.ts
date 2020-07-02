import React from 'react';
import { scrollTop } from '../../services/layout';

export interface IStateType {
  step: number;
  gotoStep: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    step: number
  ) => void;
}

const defaultState: IStateType = { step: 1, gotoStep: (): void => {} };

const AfvalMeldenContext = React.createContext<IStateType>(defaultState);

export const SET_STEP = 'SET_STEP';

export const afvalMeldenReducer = (state, action) => {
  switch (action.type) {
    case SET_STEP:
      scrollTop();
      return { ...state, step: action.payload };
    default:
      return state;
  }
};

export default AfvalMeldenContext;
