import * as irma from '@privacybydesign/irmajs';

let config: any;

export const getConfig = async () => {
  const response = await fetch('/config', {
    mode: 'cors',
  });
  return response.json();
};

export const isMobile = () => {
  return (
    /Android/i.test(window.navigator.userAgent) ||
    /iPhone/.test(window.navigator.userAgent)
  );
};

export const createIrmaSession = async (
  dataType: string,
  holderElementId: string
) => {
  // ensure config
  if (!config) {
    config = await getConfig();
  }

  const irmaResponse = await fetch(`/getsession/${dataType}`, {
    mode: 'cors',
  });

  const session = await irmaResponse.json();
  const { sessionPtr, token } = session;

  const sessionOptions = {
    method: 'canvas',
    element: holderElementId,
    showConnectedIcon: true,
    server: config.irma,
    token,
    language: 'nl',
    disableMobile: true,
  };

  if (isMobile()) {
    sessionOptions.method = 'mobile';
    sessionOptions.disableMobile = false;
  }

  const result = await irma.handleSession(sessionPtr, sessionOptions);
  const data = result.disclosed[0].reduce(
    (acc, { id, rawvalue }) => ({ ...acc, [id]: rawvalue }),
    {}
  );
  console.log('result', data);
  return data;
};
