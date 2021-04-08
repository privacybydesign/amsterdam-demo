import React, { useCallback, useLayoutEffect, useState } from 'react';
import IrmaSessionModal from '@components/IrmaSessionModal/IrmaSessionModal';
import createIrmaSession, { isMobile } from '@services/createIrmaSession';

interface IIrmaSessionInputData {
    demoPath: string;
    useDemoCredentials: boolean;
    resultCallback: (irmaSessionResult: any) => void;
    extraQuery?: { [key: string]: string };
    alwaysShowQRCode?: boolean;
}

export interface IIrmaSessionOutputData {
    modal: JSX.Element | undefined;
    startIrmaSession: (irmaSessionInputData: IIrmaSessionInputData) => void;
}

const useIrmaSession = (): IIrmaSessionOutputData => {
    const [showLogo, setShowLogo] = useState<boolean>(false);
    const [activeIrmaSessionData, setActiveIrmaSessionData] = useState<IIrmaSessionInputData | undefined>();

    // Create a trigger function that opens the modal with session data and wait for it to be rendered
    const startIrmaSession = (irmaSessionInputData: IIrmaSessionInputData) => {
        setActiveIrmaSessionData(irmaSessionInputData);
    };

    // Define callback to manually close modal
    const closeModal = useCallback(() => {
        setActiveIrmaSessionData(undefined);
        setShowLogo(false);
    }, []);

    // // Init trigger to start session (after modal has mounted)
    useLayoutEffect(() => {
        if (activeIrmaSessionData === undefined) {
            return;
        }

        // Define the callback mapping that triggers functions on IRMA state changes
        const callBackMapping = {
            ShowingQRCode: () => {
                setShowLogo(true);
            },
            ShowingQRCodeInstead: () => {
                setShowLogo(true);
            },
            ShowingIrmaButton: () => {
                if (isMobile() && activeIrmaSessionData?.alwaysShowQRCode !== true) {
                    closeModal();
                }
            },
            rest: () => {
                setShowLogo(false);
            }
        };

        // Run the actual IRMA session and fetch the result
        const startIrmaSession = async (): Promise<any> => {
            const result: any = await createIrmaSession(
                activeIrmaSessionData.demoPath,
                'irma-qr',
                { demo: activeIrmaSessionData.useDemoCredentials, ...activeIrmaSessionData.extraQuery },
                callBackMapping,
                activeIrmaSessionData.alwaysShowQRCode
            );
            activeIrmaSessionData.resultCallback(result);
            closeModal();
        };
        startIrmaSession();
    }, [activeIrmaSessionData, closeModal]);

    const modalElement = (
        <IrmaSessionModal
            showModal={activeIrmaSessionData !== undefined}
            showLogo={showLogo}
            closeModal={closeModal}
            // Make the modal invisible for mobile flow unless alwaysShowQRCode is explicitly set
            hideForMobileFlow={isMobile() && activeIrmaSessionData?.alwaysShowQRCode !== true}
        />
    );

    const irmaSessionOutputData: IIrmaSessionOutputData = { modal: modalElement, startIrmaSession };
    return irmaSessionOutputData;
};

export default useIrmaSession;
