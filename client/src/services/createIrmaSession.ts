import axios from 'axios';
import * as irma from '@privacybydesign/irmajs';

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

const instance = axios.create({});

let config: IIrmaServerConfig;

export const getConfig = async (): Promise<IIrmaServerConfig> => {
    if (!config) {
        const response = await instance.get('/config');
        config = response.data;
    }

    return config;
};

export const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Note: To use the demo credentials on non-production environments add ?demo=true to the URL
const createIrmaSession = async (
    dataType: string,
    holderElementId: string,
    credentialSourceFromDemo = false
): Promise<unknown> => {
    const config = await getConfig();
    const irmaResponse = await instance.get(`/getsession/${dataType}${credentialSourceFromDemo ? '?demo=true' : ''}`);
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
        const result = await irma.handleSession(sessionPtr, sessionOptions);
        // Only get the last part of each result
        const data = result.disclosed[0].reduce(
            (acc, { id, rawvalue }) => ({ ...acc, [id.match(/[^.]*$/g)[0]]: rawvalue }),
            {}
        );
        return data;
    } catch (e) {
        return null;
    }
};

export default createIrmaSession;
