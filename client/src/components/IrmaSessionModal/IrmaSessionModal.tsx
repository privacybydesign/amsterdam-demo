import React from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';
import { Button, Modal, themeSpacing, themeColor } from '@amsterdam/asc-ui';
import { Close } from '@amsterdam/asc-assets';
import content from '@services/content';
import { OL } from '@components/LocalAsc/LocalAsc';

export interface IProps extends React.HTMLAttributes<any> {
    showModal: boolean;
    showLogo: boolean;
    closeModal: () => void;
}

const IrmaSessionModal: React.FC<IProps> = ({ showModal, showLogo, closeModal, className }) => {
    return (
        <Modal
            backdropOpacity={0.5}
            open={showModal}
            className={className}
            onClose={closeModal}
            data-testid="qrCodeModal"
            zIndexOffset={2}
            title={content.qrcode.title}
        >
            <>
                <StyledHeader>
                    <ReactMarkDown source={content.qrcode.title} renderers={{ heading: StyledH3 }} />
                    <CloseButton
                        size={30}
                        variant="blank"
                        icon={<Close />}
                        onClick={closeModal}
                        aria-label={content.qrcode.close}
                    />
                </StyledHeader>
                <ModalWrapper>
                    <ReactMarkDown source={content.qrcode.steps} renderers={{ list: OL }} />
                    <CanvasWrapper>
                        {showLogo && <IrmaLogo />}
                        <QRCodeTopLeft />
                        <QRCodeTopRight />
                        <QRCodeBottomRight />
                        <QRCodeBottomLeft />
                        <IrmaWebElement id="irma-qr" />
                    </CanvasWrapper>
                </ModalWrapper>
            </>
        </Modal>
    );
};

export const IrmaLogo = styled.img.attrs({ src: '/assets/irma_logo.svg', role: 'presentation' })`
    position: absolute;
    width: 65px;
    height: 65px;
    top: 119px;
    left: 119px;
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

const IrmaWebElement = styled.div`
    width: 300px !important;
    height: 300px !important;
    min-height: 300px;
    background-color: transparent;

    & .irma-web-header {
        display: none;
    }
    & .irma-web-content {
        margin: 0;
        & .irma-web-waiting-for-user-animation {
        }
    }
    & .irma-web-qr-canvas {
        width: 300px !important;
        height: 300px !important;
    }
`;

const QRCodeTopLeft = styled.img.attrs({ src: '/assets/qr-top-left.svg', role: 'presentation' })`
    width: 40px;
    height: 40px;
    position: absolute;
    top: -20px;
    left: -20px;
`;

const QRCodeTopRight = styled.img.attrs({ src: '/assets/qr-top-right.svg', role: 'presentation' })`
    width: 40px;
    height: 40px;
    position: absolute;
    top: -20px;
    right: -20px;
`;

const QRCodeBottomRight = styled.img.attrs({ src: '/assets/qr-bottom-right.svg', role: 'presentation' })`
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: -20px;
    right: -20px;
`;

const QRCodeBottomLeft = styled.img.attrs({ src: '/assets/qr-bottom-left.svg', role: 'presentation' })`
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: -20px;
    left: -20px;
`;

export default IrmaSessionModal;
