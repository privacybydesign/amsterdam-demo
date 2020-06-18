import styled from '@datapunt/asc-core';

interface Props {
  maxWidth?: number;
}

export const PageContainer: React.FC = styled.div`
  background-color: transparant;
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const PageWrapper = styled.div<Props>`
  position: absolute;
  left: calc(
    (100% - ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : `1400px`)}) / 2
  );
  text-align: center;
  min-height: 100vh;
  margin: 0 auto;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : `1400px`)};
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
