import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';
import { Button, Modal, themeSpacing, themeColor } from '@datapunt/asc-ui';
import { Close } from '@datapunt/asc-assets';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { isMobile } from '@services/createIrmaSession';
import content from '@services/content';
import { OL } from '@components/LocalAsc/LocalAsc';

export interface IProps {
    label?: string;
    getSession(): Promise<null | unknown>;
    className?: string;
    dataTestId?: string;
}

const QRCode: React.FC<IProps> = ({ label, getSession, className, dataTestId }) => {
    const [hasOverlay, setHasOverlay] = useState(false);

    //Set mountedRef to keep track of the mounting state
    const mountedRef = useRef<boolean>(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const closeModal = useCallback(() => {
        setHasOverlay(false);
    }, []);

    const getQRSession = useCallback(async () => {
        if (typeof getSession === 'function') {
            if (!isMobile()) {
                setHasOverlay(true);
            }
            await getSession();
            if (mountedRef.current) {
                closeModal();
            }
        }
    }, [getSession, closeModal]);

    return (
        <span className={className}>
            <StyledButton
                data-testid={dataTestId || 'qrCodeButton'}
                onClick={getQRSession}
                variant="secondary"
                iconSize={24}
                iconLeft={<AscLocal.IrmaLogoIcon />}
            >
                {label || content.qrcode.knop}
            </StyledButton>

            <Modal backdropOpacity={0.5} open={hasOverlay} onClose={closeModal} data-testid="qrCodeModal">
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

export const IrmaLogo = styled.img.attrs({ src: '/assets/irma_logo.svg' })`
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

const Canvas = styled.canvas`
    width: 300px !important;
    height: 300px !important;
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
