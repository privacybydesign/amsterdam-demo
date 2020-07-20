import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ChevronDown, ChevronUp } from '@datapunt/asc-assets';
import { Button, Heading, themeColor } from '@datapunt/asc-ui';
import PageTemplate from '@components/PageTemplate/PageTemplate';

export interface IProps {
  getSession: Function
}

const StyledOverlay = styled.section`
  background-color: ${themeColor('tint', 'level1')};
  position: absolute;
  top: 10%;
  width: 500px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 0px;
`;

const QRCode: React.FC<IProps> = ({ getSession }) => {
  const [hasOverlay, setHasOverlay] = useState(false)

  const getQRSession = () => {
    setHasOverlay(true);
    typeof getSession === 'function' && getSession();
  }

  return (
    <div>
      <Button onClick={getQRSession} variant="secondary">
        Inloggen met IRMA
      </Button>

      {
        hasOverlay ?
          <StyledOverlay>
            <Heading as="h3">Maak uzelf bekend</Heading>

            <ol>
              <li>Scan de QR-code hieronder met uw IRMA-app.</li>
            </ol>

            <canvas id="irma-qr" />
          </StyledOverlay>
          : null
      }
    </div >
  );
};

export default QRCode;
