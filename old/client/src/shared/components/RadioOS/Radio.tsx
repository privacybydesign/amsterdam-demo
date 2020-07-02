import React, { useState, useContext, useEffect } from 'react';
import RadioStyle, {
  RadioWrapperStyle,
  RadioCircleStyle,
  Props,
  PositionProps,
} from './RadioStyle';
import RadioContext from './RadioContext';

const Radio: React.FC<Props &
  PositionProps &
  React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  onChange,
  id,
  checked: defaultChecked,
  value,
  top,
  left,
  ...otherProps
}) => {
  const [focus, setFocus] = useState(false);
  const { setChecked, checked: checkedProp, name } = useContext(RadioContext);
  const checked = checkedProp === id;

  // Pass default `checked` to RadioGroup on load and when `id` changes
  useEffect(() => {
    if (defaultChecked) setChecked(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <RadioWrapperStyle
      {...{
        focus,
        className,
        checked,
        top,
        left,
      }}
    >
      <RadioCircleStyle
        {...{
          focus,
          checked,
        }}
      />
      <RadioStyle
        {...{
          ...otherProps,
          id,
          name,
          value,
          checked,
        }}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(e);
          }
          setChecked(e.target.id);
        }}
      />
    </RadioWrapperStyle>
  );
};

export default Radio;
