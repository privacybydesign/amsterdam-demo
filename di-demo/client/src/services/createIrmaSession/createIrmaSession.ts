import axios from 'axios';
import * as irma from '@privacybydesign/irmajs';

const port = 8000;

const instance = axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:${port}`
    // headers: { 'Content-Type': 'application/json' }
});

let config: any;

export const getConfig = async () => {
    const response = await instance.get('/config');
    return response.data;
};

export const isMobile = () => {
    return /Android/i.test(window.navigator.userAgent) || /iPhone/.test(window.navigator.userAgent);
};

const createIrmaSession = async (dataType: string, holderElementId: string) => {
    // ensure config
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

    // if (isMobile()) {
    // sessionOptions.method = 'mobile';
    // sessionOptions.disableMobile = false;
    // }

    const result = await irma.handleSession(sessionPtr, sessionOptions);
    const data = result.disclosed[0].reduce((acc, { id, rawvalue }) => ({ ...acc, [id]: rawvalue }), {});
    console.log('result', data);
    return data;
};

export default createIrmaSession;
