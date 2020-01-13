import styled from '@datapunt/asc-core';

export const PageWrapper = styled.div`
  position: relative;
  text-align: center;
  min-height: 100vh;
  margin: 0 auto;
  width: 1400px;
`;

export const IrmaBaseButtonStyle = styled.button`
  background-color: transparent;
  border: 0;

  &:focus {
    outline-width: 0px;
  }

  &:hover {
    outline-width: 0px;
    cursor: pointer;
  }
`;

