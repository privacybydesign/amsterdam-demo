import IrmaCore from '@privacybydesign/irma-core';
import Web from '@privacybydesign/irma-web';
import Client from '@privacybydesign/irma-client';
import { IrmaAbortOnCancel, isMobile, IStateChangeCallbackMapping, IStateMachine } from '@services/createIrmaSession';
import { HOLDER_ELEMENT_ID } from '../pages/Vote';

const IRMA_CONF = {
    NAME_ID: 'irma-demo.stemmen.stempas.election',
    NUMBER_ID: 'irma-demo.stemmen.stempas.votingnumber'
};

export interface IReduceIrmaResult {
    votingnumber: string | undefined;
    message: string;
}

export interface IDisclosed {
    id: string;
    rawvalue: string;
}

export interface IIrmaResult {
    signature: {
        message: string;
    };
    disclosed: IDisclosed[][];
}

export interface IQueryObj {
    [key: string]: string;
}

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
                window.location.href = payload.mobile;
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
        if (Object.keys(this._mapping)?.indexOf(newState) !== -1 && typeof this._mapping[newState] === 'function') {
            this._mapping[newState]();
        } else if (this._mapping.rest && typeof this._mapping.rest === 'function') {
            this._mapping.rest();
        }
    }

    close() {
        return Promise.resolve();
    }
}

const createIrmaVoteSession = async (
    objectToSign: IQueryObj,
    callBackMapping?: IStateChangeCallbackMapping
): Promise<IIrmaResult | undefined> => {
    const irma = new IrmaCore({
        debugging: true,
        element: `#${HOLDER_ELEMENT_ID}`,
        callBackMapping,
        session: {
            url: `demos/vote`,

            start: {
                url: (o: any) => `${o.url}/start`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ msg: objectToSign })
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
        return result;
    } catch (e) {
        return undefined;
    }
};

export const reduceIrmaResult = (result: IIrmaResult): IReduceIrmaResult => {
    const votingnumber = result.disclosed[0].find(attr => attr.id == IRMA_CONF.NUMBER_ID)?.rawvalue;

    const message = result.signature.message;
    return { votingnumber, message };
};

export default createIrmaVoteSession;
