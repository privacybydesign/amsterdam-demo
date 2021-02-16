import axios from 'axios';
import '@privacybydesign/irma-css';
import IrmaCore from '@privacybydesign/irma-core';
import Web from '@privacybydesign/irma-web';
import Client from '@privacybydesign/irma-client';

// Types
export interface IIrmaServerConfig {
    requestorname: string;
    uuid: string;
    irma: string;
    nodeUrl: string;
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
    constructor({ options }) {
        this.mapping = options.callBackMapping;
    }

    stateChange({ newState }) {
        if (Object.keys(this.mapping).indexOf(newState) !== -1 && typeof this.mapping[newState] === 'function') {
            this.mapping[newState]();
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
    constructor({ stateMachine }) {
        this._stateMachine = stateMachine;
    }
    stateChange({ newState }) {
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
        .map((key, index) => `${index === 0 ? '?' : ''}${key}=${query[key]}`)
        .join('&');

    const irma = new IrmaCore({
        debugging: true,
        element: `#${holderElementId}`,
        callBackMapping,

        session: {
            url: `/getsession/${dataType}${queryString}`,

            start: {
                url: o => `${o.url}`,
                method: 'GET'
            },

            mapping: {
                sessionPtr: r => ({ ...r.sessionPtr, u: r.sessionPtr.u.replace(/\/irma/g, '/irma/irma') })
            },

            result: {
                url: (o, { sessionToken }) => `/result?token=${sessionToken}`
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
            ...conjunction.reduce((acc, { id, rawvalue }) => ({ ...acc, [id.match(/[^.]*$/g)[0]]: rawvalue }), {})
        };
    });
    return joinedResults;
};

export default createIrmaSession;
