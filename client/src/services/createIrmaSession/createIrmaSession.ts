import axios from 'axios';
import * as irma from '@privacybydesign/irmajs';

// Types
interface IIrmaServerConfig {
    requestorname: string;
    uuid: string;
    irma: string;
    nodeUrl: string;
    docroot: string;
    port: number;
}

const port = 8000;

const instance = axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:${port}`
});

let config: IIrmaServerConfig;

export const getConfig = async (): Promise<IIrmaServerConfig> => {
    const response = await instance.get('/config');
    return response.data;
};

export const isMobile = (): boolean => {
    return /Android/i.test(window.navigator.userAgent) || /iPhone/.test(window.navigator.userAgent);
};

const createIrmaSession = async (dataType: string, holderElementId: string): Promise<unknown> => {
    if (!config) {
        config = await getConfig();
    }

    const irmaResponse = await instance.get(`/getsession/${dataType}`);
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

    // TODO: Fix mobile session options
    // if (isMobile()) {
    //     sessionOptions.method = 'mobile';
    //     sessionOptions.disableMobile = false;
    // }

    const result = await irma.handleSession(sessionPtr, sessionOptions);
    const data = result.disclosed[0].reduce((acc, { id, rawvalue }) => ({ ...acc, [id]: rawvalue }), {});
    return data;
};

export default createIrmaSession;
