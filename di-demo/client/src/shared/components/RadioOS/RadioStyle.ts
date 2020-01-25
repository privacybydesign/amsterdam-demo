import styled, { css } from '@datapunt/asc-core';
import { themeColor, themeSpacing } from '@datapunt/asc-ui';

export type Props = {
  name?: string;
  value?: string;
  id: string;
  checked?: boolean;
  onChange?: Function;
};

export type PositionProps = {
  top?: number;
  left?: number;
};

type StyleOnlyProps = {
  checked?: boolean;
  focus?: boolean;
};

const RadioStyle = styled.input.attrs({
  type: 'radio',
})<Props>`
  top: 0;
  left: 0;
  width: 100%;
  cursor: inherit;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  opacity: 0;
`;

export const RadioCircleStyle = styled.span<StyleOnlyProps>`
  position: relative;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: white;

  &::after {
    content: '';
    position: absolute;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    background: url(/assets/icons/checked.svg);
    background-size: contain;
    background-repeat: no-repeat;

    opacity: 0;
    ${({ checked }) =>
      checked &&
      css`
        opacity: 1;
      `}
  }

  ${({ checked, focus }) =>
    !checked &&
    !focus &&
    css`
      border-width: 2px;
      color: red;
    `}
`;

export const RadioWrapperStyle = styled.div<
  StyleOnlyProps & { focus: boolean } & PositionProps
>`
  position: relative;
  display: inline-flex;
  user-select: none;
  vertical-align: middle;
  flex-shrink: 0; /* IE11 fix */
  padding: ${themeSpacing(1)};
  margin-bottom: 1px;
  ${({ top }) =>
    top &&
    css`
      top: ${top}px;
    `};
  ${({ left }) =>
    left &&
    css`
      left: ${left}px;
    `};
  &:hover {
    cursor: pointer;
  }
`;

export default RadioStyle;
