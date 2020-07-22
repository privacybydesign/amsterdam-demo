import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';

import content from '@services/content';

import { Button, Modal, themeSpacing } from '@datapunt/asc-ui';
import { Linkedin } from '@datapunt/asc-assets';
// @todo fix irma logo

export interface IProps {
  getSession: Function
}

const StyledH3 = styled.h3``;

const QRCode: React.FC<IProps> = ({ getSession }) => {
  const [hasOverlay, setHasOverlay] = useState(false)

  const getQRSession = () => {
    setHasOverlay(true);
    typeof getSession === 'function' && getSession();
  }

  const StyledButton = styled(Button)`
    margin-bottom: ${themeSpacing(7)};
  `;

  return (
    <div>
      <StyledButton onClick={getQRSession} variant="secondary" iconLeft={<Linkedin />}>
        <ReactMarkDown source={content.qrcode.knop} />
      </StyledButton>

      {
        hasOverlay ?
          <Modal open backdropOpacity={0.5}>
            <ReactMarkDown source={content.qrcode.title} renderers={{ heading: StyledH3 }} />

            <ReactMarkDown source={content.qrcode.stappen} />

            <canvas id="irma-qr" />
          </Modal>
          : null
      }
    </div>
  );
};

export default QRCode;
