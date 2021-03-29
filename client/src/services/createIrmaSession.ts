import axios from 'axios';
import '@privacybydesign/irma-css';
import IrmaCore from '@privacybydesign/irma-core';
import Web from '@privacybydesign/irma-web';
import Client from '@privacybydesign/irma-client';
import userAgent from './userAgent';

// Types
export interface IIrmaServerConfig {
    requestorname: string;
    irma: string;
    docroot: string;
    port: number;
    environment: string;
}

let config: IIrmaServerConfig;

export const getConfig = async (): Promise<IIrmaServerConfig> => {
    if (!config) {
        const response = await axios.get('/config');
        config = response.data;
    }

    return config;
};

export const isMobile = (): boolean => {
    return userAgent === 'Android' || userAgent === 'iOS';
};

// Types for Irma Plugins
export interface IStateChangeCallbackMapping {
    [stateName: string]: () => void;
}

export interface IIrmaSessionData {}

export interface IStateMachine {
    transition: (state: string, payload?: any) => void;
}

// IRMA Custom Plugins
class IrmaSkipMobileChoice {
    _stateMachine: IStateMachine;
    _alwaysShowQRCode = false;

    constructor({ stateMachine, options }: { stateMachine: any; options: any }) {
        this._stateMachine = stateMachine;
        if (options.alwaysShowQRCode) {
            this._alwaysShowQRCode = options.alwaysShowQRCode;
        }
    }

    // Skip the qr/app choice screen on mobile and decide for ourselves.
    stateChange({ newState, payload }: { newState: any; payload: any }) {
        if (newState === 'ShowingIrmaButton') {
            if (this._alwaysShowQRCode) {
                this._stateMachine.transition('chooseQR', payload);
            } else {
                window.location = payload.mobile;
            }
        }
    }
}
class IrmaStateChangeCallback {
    _mapping: IStateChangeCallbackMapping;
    constructor({ options }: { options: any }) {
        this._mapping = options.callBackMapping;
    }

    stateChange({ newState }: { newState: any }) {
        if (Object.keys(this._mapping).indexOf(newState) !== -1 && typeof this._mapping[newState] === 'function') {
            this._mapping[newState]();
        } else if (this._mapping.rest && typeof this._mapping.rest === 'function') {
            this._mapping.rest();
        }
    }

    close() {
        return Promise.resolve();
    }
}

class IrmaAbortOnCancel {
    _stateMachine: IStateMachine;
    constructor({ stateMachine }: { stateMachine: any }) {
        this._stateMachine = stateMachine;
    }
    stateChange({ newState }: { newState: any }) {
        if (newState === 'Cancelled') this._stateMachine.transition('abort');
    }
}

// IRMA Session handler

const createIrmaSession = async (
    dataType: string,
    holderElementId: string,
    query = {},
    callBackMapping?: IStateChangeCallbackMapping,
    alwaysShowQRCode = false
): Promise<unknown> => {
    const queryString = Object.keys(query)
        .map((key, index) => `${index === 0 ? '?' : ''}${key}=${(query as any)[key]}`)
        .join('&');

    const irma = new IrmaCore({
        debugging: true,
        element: `#${holderElementId}`,
        callBackMapping,
        alwaysShowQRCode,
        session: {
            url: `/${dataType}${queryString}`,

            start: {
                url: (o: any) => `${o.url}`,
                method: 'GET'
            },

            mapping: {
                sessionPtr: (sessionPtr: any) => ({ ...sessionPtr, u: sessionPtr.u.replace(/\/irma/g, '/irma/irma') })
            },

            result: {
                url: () => `/demos/result`
            }
        }
    });

    irma.use(Client);
    irma.use(Web);

    if (isMobile()) {
        irma.use(IrmaSkipMobileChoice);
    }

    if (callBackMapping) {
        irma.use(IrmaStateChangeCallback);
    }
    irma.use(IrmaAbortOnCancel);

    try {
        const result = await irma.start();
        return reduceIRMAResult(result.disclosed);
    } catch (e) {
        return null;
    }
};

interface IDisclosedCredentialSet {
    [index: number]: IDisclosedCredential;
}

interface IDisclosedCredential {
    id: string;
    rawvalue: string;
    value: { [key: string]: unknown };
    status: string;
    issuancetime: number;
}

const reduceIRMAResult = (disclosedCredentialSets: IDisclosedCredentialSet[]) => {
    let joinedResults = {};
    disclosedCredentialSets.forEach((conjunction: IDisclosedCredential[]) => {
        joinedResults = {
            ...joinedResults,
            ...conjunction.reduce(
                (acc, { id, rawvalue }) => ({ ...acc, [(id as any).match(/[^.]*$/g)[0]]: rawvalue }),
                {}
            )
        };
    });
    return joinedResults;
};

export default createIrmaSession;
