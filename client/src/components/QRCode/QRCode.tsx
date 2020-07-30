import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';
import { Button, Modal, themeSpacing, themeColor } from '@datapunt/asc-ui';
import { Close } from '@datapunt/asc-assets';
import { isMobile } from '@services/createIrmaSession';
import content from '@services/content';
import { OL } from '@components/LocalAsc/LocalAsc';

export interface IProps {
    label?: string;
    getSession(): Promise<void>;
    className?: string;
}

const QRCode: React.FC<IProps> = ({ label, getSession, className }) => {
    const [hasOverlay, setHasOverlay] = useState(false);

    const getQRSession = () => {
        if (!isMobile()) {
            setHasOverlay(true);
        }
        typeof getSession === 'function' && getSession();
    };

    const closeModal = () => {
        setHasOverlay(false);
    };

    return (
        <span className={className}>
            <StyledButton onClick={getQRSession} variant="secondary" iconSize={24} iconLeft={<IrmaLogoIcon />}>
                {label || content.qrcode.knop}
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
                            <QRCodeTopLeft />
                            <QRCodeTopRight />
                            <QRCodeBottomRight />
                            <QRCodeBottomLeft />
                            <Canvas id="irma-qr" />
                        </CanvasWrapper>
                    </ModalWrapper>
                </>
            </Modal>
        </span>
    );
};

const StyledButton = styled(Button)`
    margin: ${themeSpacing(0, 6, 6, 0)};
`;

const IrmaLogoIcon = styled.img.attrs({ src: '/assets/irma_logo.svg' })`
    width: 24px;
`;

const StyledH3 = styled.h3``;

const ModalWrapper = styled.div`
    padding: ${themeSpacing(0, 5, 5, 5)};
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
    position: relative;
    width: 300px !important;
    height: 300px !important;
    margin: 50px auto;
`;

const Canvas = styled.canvas`
    width: 300px !important;
    height: 300px !important;
`;

const IrmaLogo = styled.img.attrs({ src: '/assets/irma_logo.svg' })`
    position: absolute;
    width: 120px;
    height: 120px;
    top: 90px;
    left: 90px;
`;

const QRCodeTopLeft = styled.img.attrs({ src: '/assets/qr-top-left.svg' })`
    width: 40px;
    height: 40px;
    position: absolute;
    top: -20px;
    left: -20px;
`;

const QRCodeTopRight = styled.img.attrs({ src: '/assets/qr-top-right.svg' })`
    width: 40px;
    height: 40px;
    position: absolute;
    top: -20px;
    right: -20px;
`;

const QRCodeBottomRight = styled.img.attrs({ src: '/assets/qr-bottom-right.svg' })`
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: -20px;
    right: -20px;
`;

const QRCodeBottomLeft = styled.img.attrs({ src: '/assets/qr-bottom-left.svg' })`
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: -20px;
    left: -20px;
`;

export default QRCode;
