import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';

import content from '@services/content';

import { Button, Modal, themeSpacing, themeColor } from '@datapunt/asc-ui';
import { OL } from '@components/LocalAsc/LocalAsc';
import { Close } from '@datapunt/asc-assets';

export interface IProps {
    getSession(): Promise<void>;
    className?: string;
}

const QRCode: React.FC<IProps> = ({ getSession, className }) => {
    const [hasOverlay, setHasOverlay] = useState(false);

    const getQRSession = () => {
        setHasOverlay(true);
        typeof getSession === 'function' && getSession();
    };

    const closeModal = () => {
        setHasOverlay(false);
    };

    return (
        <div className={className}>
            <StyledButton onClick={getQRSession} variant="secondary" iconSize={24} iconLeft={<IrmaLogo24 />}>
                <ReactMarkDown source={content.qrcode.knop} />
            </StyledButton>

            <Modal backdropOpacity={0.5} open={hasOverlay} onClose={closeModal}>
                <>
                    <StyledHeader>
                        <ReactMarkDown source={content.qrcode.title} renderers={{ heading: StyledH3 }} />
                        <CloseButton size={30} variant="blank" icon={<Close />} onClick={closeModal} />
                    </StyledHeader>
                    <ModalWrapper>
                        <ReactMarkDown source={content.qrcode.stappen} renderers={{ list: OL }} />

                        <CanvasWrapper>
                            <IrmaLogo />
                            <Canvas id="irma-qr" />
                        </CanvasWrapper>
                    </ModalWrapper>
                </>
            </Modal>
        </div>
    );
};

const IrmaLogo24 = styled.img.attrs({ src: '/assets/irma_logo.svg' })`
    width: 24px;
`;

const StyledButton = styled(Button)`
    margin-top: ${themeSpacing(6)};
    margin-bottom: ${themeSpacing(6)};
`;

const StyledH3 = styled.h3``;

const ModalWrapper = styled.div`
    padding: ${themeSpacing(0, 5, 5, 5)};
    ul,
    ol {
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
`;

const CanvasWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const IrmaLogo = styled.img.attrs({ src: '/assets/irma_logo.svg' })`
    position: absolute;
    margin-top: 155px;
    width: 120px;
    height: 120px;
`;

const Canvas = styled.canvas`
    width: 365px !important;
    height: 365px !important;
    border: 5px solid ${themeColor('primary', 'main')};
    padding: ${themeSpacing(8)};
    margin: ${themeSpacing(8)};
`;

export default QRCode;
