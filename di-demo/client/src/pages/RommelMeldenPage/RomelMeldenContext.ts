import React from "react";

interface StateType {
  state: any;
  dispatch: any;
}

const defaultState: StateType = { state: {}, dispatch: (): void => {} };

const RommelMeldenContext = React.createContext<StateType>(defaultState);


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
