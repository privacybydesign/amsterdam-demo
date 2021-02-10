import axios from 'axios';
import * as irma from '@privacybydesign/irmajs';
import * as irmaNew from '@privacybydesign/irma-frontend';
import '@privacybydesign/irma-css';
import IrmaCore from '@privacybydesign/irma-core';
import Popup from '@privacybydesign/irma-popup';
import Web from '@privacybydesign/irma-web';
import Client from '@privacybydesign/irma-client';

const nativeDrawImage = window.CanvasRenderingContext2D.prototype.drawImage;

const wrapDrawImage = (holderElementId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.CanvasRenderingContext2D.prototype.drawImage = function (...args: any) {
        // Draw the original image
        nativeDrawImage.call(this, ...args);

        // Remove the old logo
        const canvas = document.getElementById(holderElementId) as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#dddbdb';
        ctx.fillRect(82, 62, 65, 100);
    };
};

const unwrapDrawImage = () => {
    window.CanvasRenderingContext2D.prototype.drawImage = nativeDrawImage;
};

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

export const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Note: To use the demo credentials on non-production environments add ?demo=true to the URL
const createIrmaSession = async (dataType: string, holderElementId: string, query = {}): Promise<unknown> => {
    const config = await getConfig();

    const queryString = Object.keys(query)
        .map((key, index) => `${index === 0 ? '?' : ''}${key}=${query[key]}`)
        .join('&');

    const irmaResponse = await axios.get(`/getsession/${dataType}${queryString}`);
    const session = await irmaResponse.data;

    const { sessionPtr, token } = session;

    const sessionOptions = {
        method: 'canvas',
        element: holderElementId,
        showConnectedIcon: true,
        server: config.irma,
        token,
        language: 'nl',
        disableMobile: true
    };

    if (isMobile()) {
        sessionOptions.method = 'mobile';
        sessionOptions.disableMobile = false;
    }

    try {
        // This function wraps the canvas context drawImage method to be able to run some code when the QR code disappears
        wrapDrawImage(holderElementId);
        // Adjust malformed url returned from irma server due to rewrite
        sessionPtr.u = sessionPtr.u.replace(/\/irma/g, '/irma/irma');
        const result = await irma.handleSession(sessionPtr, sessionOptions);
        console.log('result: ', result);
        unwrapDrawImage();

        // Only get the last part of each result
        return reduceIRMAResult(result.disclosed);
    } catch (e) {
        return null;
    }
};

const createIrmaSession2 = async (dataType: string, holderElementId: string, query = {}): Promise<unknown> => {
    const config = await getConfig();

    const queryString = Object.keys(query)
        .map((key, index) => `${index === 0 ? '?' : ''}${key}=${query[key]}`)
        .join('&');

    const irma = new IrmaCore({
        debugging: true, // Enable to get helpful output in the browser console
        element: holderElementId,

        // Back-end options
        session: {
            // Point this to your controller:
            url: `/getsession/${dataType}${queryString}`,

            start: {
                url: o => `${o.url}`,
                method: 'GET'
            },

            mapping: {
                sessionPtr: sessionPtr => ({ ...sessionPtr, u: sessionPtr.u.replace(/\/irma/g, '/irma/irma') })
            },

            result: {
                url: o => `/result`
            }
        }
    });

    irma.use(Client);
    irma.use(Web);

    irma.start()
        .then(result => console.log('Successful disclosure! 🎉', result))
        .catch(error => console.error("Couldn't do what you asked 😢", error));

    // const { sessionPtr, token } = session;
    // const sessionOptions = {
    //     method: 'canvas',
    //     element: holderElementId,
    //     showConnectedIcon: true,
    //     server: config.irma,
    //     token,
    //     language: 'nl',
    //     disableMobile: true
    // };

    // if (isMobile()) {
    //     sessionOptions.method = 'mobile';
    //     sessionOptions.disableMobile = false;
    // }

    // try {
    //     // This function wraps the canvas context drawImage method to be able to run some code when the QR code disappears
    //     wrapDrawImage(holderElementId);
    //     // Adjust malformed url returned from irma server due to rewrite
    //     sessionPtr.u = sessionPtr.u.replace(/\/irma/g, '/irma/irma');
    //     const result = await irma.handleSession(sessionPtr, sessionOptions);
    //     console.log('result: ', result);
    //     unwrapDrawImage();

    //     // Only get the last part of each result
    //     return reduceIRMAResult(result.disclosed);
    // } catch (e) {
    //     return null;
    // }
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

export default createIrmaSession2;
