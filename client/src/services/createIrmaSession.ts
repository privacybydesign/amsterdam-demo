import axios from 'axios';
import '@privacybydesign/irma-css';
import IrmaCore from '@privacybydesign/irma-core';
import Web from '@privacybydesign/irma-web';
import Client from '@privacybydesign/irma-client';

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

export interface IStateChangeCallbackMapping {
    [stateName: string]: () => void;
}

class IrmaStateChangeCallback {
    mapping: IStateChangeCallbackMapping;
    constructor({ options }: { options: any }) {
        this.mapping = options.callBackMapping;
    }

    stateChange({ newState }: { newState: any }) {
        if (Object.keys(this.mapping).indexOf(newState) !== -1 && typeof this.mapping[newState] === 'function') {
            this.mapping[newState]();
        } else if (this.mapping.rest && typeof this.mapping.rest === 'function') {
            this.mapping.rest();
        }
    }

    close() {
        return Promise.resolve();
    }
}

export const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

interface IStateMachine {
    transition: (state: string) => void;
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

const createIrmaSession = async (
    dataType: string,
    holderElementId: string,
    query = {},
    callBackMapping?: IStateChangeCallbackMapping
): Promise<unknown> => {
    const queryString = Object.keys(query)
        .map((key, index) => `${index === 0 ? '?' : ''}${key}=${(query as any)[key]}`)
        .join('&');

    const irma = new IrmaCore({
        debugging: true,
        element: `#${holderElementId}`,
        callBackMapping,

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
                url: () => `/result`
            }
        }
    });

    irma.use(Client);
    irma.use(Web);
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
