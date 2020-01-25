import React from 'react';

import RadioGroupStyle, { Props } from './RadioGroupStyle';
import RadioContext from './RadioContext';

const RadioGroup: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  name,
  children,
  ...otherProps
}) => {
  const [checked, setChecked] = React.useState('');
  return (
    <RadioContext.Provider
      value={{
        checked,
        setChecked,
        name,
      }}
    >
      <RadioGroupStyle {...otherProps}>{children}</RadioGroupStyle>
    </RadioContext.Provider>
  );
};

export default RadioGroup;
