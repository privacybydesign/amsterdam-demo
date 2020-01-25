import * as irma from '@privacybydesign/irmajs';

let config: any;

export const getConfig = async () => {
  const response = await fetch('/config', {
    mode: 'cors',
  });
  return await response.json();
};

export const isMobile = () => {
  return (
    /Android/i.test(window.navigator.userAgent) ||
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  );
};

export const sendVote = async (identifier, vote) => {
  const response = await fetch('/vote', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ identifier, vote }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
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
  };

  if (isMobile()) {
    sessionOptions.method = 'mobile';
  } else {
  }

  const result = await irma.handleSession(sessionPtr, sessionOptions);

  return result.disclosed[0].value.nl;
};
