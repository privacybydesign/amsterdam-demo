import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import IrmaSessionModal from '@components/IrmaSessionModal/IrmaSessionModal';
import createIrmaSession, { isMobile } from '@services/createIrmaSession';
import reduceIRMAResult from '@services/reduceIRMAResult';
import { useCurrentLanguage } from '@services/ContentProvider';

interface IIrmaSessionInputData {
    demoPath: string;
    useDemoCredentials: boolean;
    resultCallback: (irmaSessionResult: any) => void;
    extraQuery?: { [key: string]: string };
    alwaysShowQRCode?: boolean;
    irmaQrId: string;
}

export interface IIrmaSessionOutputData {
    modal: JSX.Element | undefined;
    url: string | undefined;
    showModal: () => void;
    startIrmaSession: (activeIrmaSessionDataInput?: IIrmaSessionInputData) => void;
    irmaSession: any;
}

const useIrmaSession = (activeIrmaSessionDataInput?: IIrmaSessionInputData): IIrmaSessionOutputData => {
    const [QRIsShowing, setQRIsShowing] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const [activeIrmaSessionData, setActiveIrmaSessionData] = useState<IIrmaSessionInputData | undefined>(
        activeIrmaSessionDataInput
    );
    const [url, setUrl] = useState<string>();
    const [deferStart, setDeferStart] = useState<boolean>(activeIrmaSessionDataInput === undefined);
    const session = useRef<any>(null);
    const language = useCurrentLanguage();

    // Define callback to manually close modal
    const closeModal = useCallback(() => {
        setQRIsShowing(false);
        setActiveIrmaSessionData(undefined);
        setShowModal(false);
    }, []);

    // // Init trigger to start session (after modal has mounted)
    useLayoutEffect(() => {
        if (activeIrmaSessionData === undefined) {
            return;
        }

        // Define the callback mapping that triggers functions on IRMA state changes
        const callBackMapping = {
            ShowingQRCode: (payload: { mobile: string }) => {
                setQRIsShowing(true);

                if (isMobile() && activeIrmaSessionData?.alwaysShowQRCode !== true) {
                    setUrl(payload?.mobile ?? '');
                }
            },
            ShowingQRCodeInstead: () => {
                setQRIsShowing(true);
            },
            ShowingIrmaButton: (payload: { mobile: string }) => {
                setUrl(payload?.mobile ?? '');
                if (
                    isMobile() &&
                    activeIrmaSessionData?.alwaysShowQRCode !== true &&
                    activeIrmaSessionDataInput !== undefined
                ) {
                    closeModal();
                }
            },
            rest: () => {
                setQRIsShowing(false);
            }
        };

        // Run the actual IRMA session and fetch the result
        const startIrmaSession = async (): Promise<void> => {
            if (session.current === null) {
                session.current = createIrmaSession(
                    activeIrmaSessionData.demoPath,
                    activeIrmaSessionData?.irmaQrId || 'irma-qr',
                    { demo: activeIrmaSessionData.useDemoCredentials, ...activeIrmaSessionData.extraQuery },
                    callBackMapping,
                    activeIrmaSessionData.alwaysShowQRCode,
                    language
                );
            }

            try {
                const result = await session.current.start();
                const reducedResult = reduceIRMAResult(result.disclosed);
                activeIrmaSessionData.resultCallback(reducedResult);
                closeModal();
            } catch (e) {
                return;
            }
        };
        if (!deferStart) {
            startIrmaSession();
        }
    }, [deferStart, activeIrmaSessionData, closeModal, language]);

    const modalElement = (
        <div style={{ display: showModal ? 'block' : 'none' }}>
            <IrmaSessionModal
                showModal={true}
                QRIsShowing={QRIsShowing}
                closeModal={closeModal}
                irmaQrId={activeIrmaSessionData?.irmaQrId || 'irma-qr'}
                // Make the modal invisible for mobile flow unless alwaysShowQRCode is explicitly set
                hideForMobileFlow={!showModal}
            />
        </div>
    );

    const irmaSessionOutputData: IIrmaSessionOutputData = {
        modal: modalElement,
        url,
        showModal: () => {
            setShowModal(true);
        },
        startIrmaSession: activeIrmaSessionDataInput => {
            if (activeIrmaSessionDataInput !== undefined) {
                setActiveIrmaSessionData(activeIrmaSessionDataInput);
            }

            setDeferStart(false);
        },
        irmaSession: session.current
    };
    return irmaSessionOutputData;
};

export default useIrmaSession;
