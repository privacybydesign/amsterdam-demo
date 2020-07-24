import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';

import content from '@services/content';

import { Button, Modal, themeSpacing, themeColor } from '@datapunt/asc-ui';
import { Linkedin, Close } from '@datapunt/asc-assets';
// @todo fix irma logo

export interface IProps {
  getSession: Function
}

const StyledButton = styled(Button)`
  margin-top: ${themeSpacing(6)};
  margin-bottom: ${themeSpacing(6)};
`;

const StyledH3 = styled.h3``;

const ModalWrapper = styled.div`
  padding: ${themeSpacing(0 5 5 5)};
  ul, ol {
    margin-top: 0;
  }
`;

const StyledHeader = styled.div`
  border-bottom: 1px solid ${themeColor('tint', 'level5')};
  display: flex;
  padding-left: ${themeSpacing(5)};
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled(Button)`
  margin-right: ${themeSpacing(3)};
` ;

const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${themeSpacing(3 0 5)};
` ;

const StyledOL = styled.ol`
  margin-top: 0;
`;


const QRCode: React.FC<IProps> = ({ getSession }) => {
  const [hasOverlay, setHasOverlay] = useState(false)

  const getQRSession = () => {
    setHasOverlay(true);
    typeof getSession === 'function' && getSession();
  }

  const closeModal = () => {
    setHasOverlay(false);
  }

  return (
    <div>
      <StyledButton onClick={getQRSession} variant="secondary" iconLeft={<Linkedin />}>
        <ReactMarkDown source={content.qrcode.knop} />
      </StyledButton>

      <Modal backdropOpacity={0.5} open={hasOverlay} onClose={closeModal}>
        <>
          <StyledHeader>
            <ReactMarkDown source={content.qrcode.title} renderers={{ heading: StyledH3 }} />
            <CloseButton size={30} variant="blank" icon={<Close />} onClick={closeModal} />
          </StyledHeader>
          <ModalWrapper>
            <ReactMarkDown source={content.qrcode.stappen} renderers={{ list: StyledOL }} />

            <CanvasWrapper>
              <canvas id="irma-qr" />
            </CanvasWrapper>
          </ModalWrapper>
        </>
      </Modal>

    </div>
  );
};

export default QRCode;
