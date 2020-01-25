import styled, { css } from '@datapunt/asc-core';

export interface ButtonStyleProps {
  width: number;
  height: number;
  top: number;
  left: number;
  debug?: boolean;
  inactive?: boolean;
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  position: absolute

  border: ${({ debug }) => (debug ? `3px solid black` : '0')};

  width: ${({ width }) => `${width}px`}
  height: ${({ height }) => `${height}px`}
  top: ${({ top }) => `${top}px`}
  left: ${({ left }) => `${left}px`}

  background-color: ${({ inactive }) =>
    inactive ? 'rgba(255, 255, 255, 0.5)' : 'transparent'};

  &:focus {
      outline-width: 0px;
    }

  &:hover {
    outline-width: 0px;
    cursor: ${({ inactive }) => (inactive ? 'not-allowed' : 'pointer')};
  }
`;

export default ButtonStyle;
