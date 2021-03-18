import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import ReactMarkDown from 'react-markdown';
import { Button, Modal, themeSpacing, themeColor } from '@amsterdam/asc-ui';
import { Close } from '@amsterdam/asc-assets';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { isMobile, IStateChangeCallbackMapping } from '@services/createIrmaSession';
import content from '@services/content';
import { OL } from '@components/LocalAsc/LocalAsc';

export interface IProps {
    label?: string;
    getSession(callBackMapping: IStateChangeCallbackMapping): Promise<null | unknown>;
    className?: string;
    dataTestId?: string;
}

const QRCode: React.FC<IProps> = ({ label, getSession, className, dataTestId }) => {
    const [hasOverlay, setHasOverlay] = useState(false);
    const [showLogo, setShowLogo] = useState(true);

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
        }
    }, [getSession]);

    useLayoutEffect(() => {
        const fn = async () => {
            if (hasOverlay) {
                const callBackMapping = {
                    ShowingQRCode: () => {
                        setShowLogo(true);
                    },
                    rest: () => {
                        setShowLogo(false);
                    }
                };
                await getSession(callBackMapping);
                if (mountedRef.current) {
                    closeModal();
                }
            }
        };
        fn();
    }, [hasOverlay]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <span className={className}>
            <StyledButton
                data-testid={dataTestId || 'qrCodeButton'}
                onClick={getQRSession}
                variant="secondary"
                iconSize={24}
                iconLeft={<AscLocal.IrmaLogoIcon />}
            >
                {label || content.qrcode.button}
            </StyledButton>

            <Modal
                backdropOpacity={0.5}
                open={hasOverlay}
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
        </span>
    );
};

const StyledButton = styled(Button)`
    margin: ${themeSpacing(0, 6, 6, 0)};
`;

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

export default QRCode;
