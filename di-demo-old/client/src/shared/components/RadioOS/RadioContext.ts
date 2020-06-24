import React from 'react';

const RadioContext = React.createContext({
  checked: '',
  setChecked: () => {},
  name: undefined,
} as {
  checked: string;
  setChecked: Function;
  name: string | undefined;
});
export default RadioContext;
