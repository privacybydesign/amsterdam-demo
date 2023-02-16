import React from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';
import { Button, Modal, themeSpacing, themeColor } from '@amsterdam/asc-ui';
import { Close } from '@amsterdam/asc-assets';
import { OL } from '@components/LocalAsc/LocalAsc';
import IrmaSessionCounter from '@components/IrmaSessionCounter/IrmaSessionCounter';
import { isMobile } from '@services/createIrmaSession';
import { useContent } from '@services/ContentProvider';
export interface IProps extends React.HTMLAttributes<any> {
    showModal: boolean;
    QRIsShowing: boolean;
    hideForMobileFlow?: boolean;
    closeModal: () => void;
    irmaQrId: string;
}

const IrmaSessionModal: React.FC<IProps> = ({
    showModal,
    QRIsShowing,
    closeModal,
    className,
    hideForMobileFlow = false,
    irmaQrId
}) => {
    const content = useContent();

    return (
        <StyledModal
            backdropOpacity={0.5}
            open={showModal}
            className={className}
            onClose={closeModal}
            data-testid="qrCodeModal"
            zIndexOffset={2}
            title={content.qrcode.title}
            hideForMobileFlow={hideForMobileFlow}
            disablePortal
        >
            <>
                <StyledHeader>
                    <ReactMarkDown source={content.qrcode.title} renderers={{ heading: StyledH3 }} />
                    <CounterContainer>
                        <IrmaSessionCounter minutes={5} QRIsShowing={QRIsShowing} />
                    </CounterContainer>
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
                        {QRIsShowing && <IrmaLogo />}
                        <QRCodeTopLeft />
                        <QRCodeTopRight />
                        <QRCodeBottomRight />
                        <QRCodeBottomLeft />
                        <IrmaWebElement id={irmaQrId} />
                    </CanvasWrapper>
                </ModalWrapper>
            </>
        </StyledModal>
    );
};

const IrmaLogo = styled.img.attrs({ src: '/assets/yivi_logo_button.svg', role: 'presentation' })`
    position: absolute;
    width: 65px;
    height: 65px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledModal = styled(Modal)<{ hideForMobileFlow: boolean }>`
    visibility: ${({ hideForMobileFlow }) => (hideForMobileFlow ? 'hidden' : 'visible')};
    max-height: 100vh;
`;

const CounterContainer = styled.div`
    text-align: center;
    font-style: italic;
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
    align-items: baseline;
`;

const CloseButton = styled(Button)`
    margin-right: ${themeSpacing(3)};
    align-self: center;
`;

const CanvasWrapper = styled.div`
    position: relative;
    width: ${() => (isMobile() ? '250' : '300')}px !important;
    height: ${() => (isMobile() ? '250' : '300')}px !important;
    margin: 50px auto;
`;

const IrmaWebElement = styled.div`
    width: ${() => (isMobile() ? '250' : '300')}px !important;
    height: ${() => (isMobile() ? '250' : '300')}px !important;
    min-width: ${() => (isMobile() ? '250' : '300')}px;
    min-height: ${() => (isMobile() ? '250' : '300')}px;
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
        width: ${() => (isMobile() ? '250' : '300')}px !important;
        height: ${() => (isMobile() ? '250' : '300')}px !important;
        & + p {
            display: none;
        }
    }

    p,
    a {
        color: ${themeColor('tint', 'level7')} !important;
        font-family: 'Amsterdam Sans' !important;
        font-size: 17px !important;
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
