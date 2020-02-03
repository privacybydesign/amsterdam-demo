const express = require('express');
const irma = require('@privacybydesign/irmajs');
const app = express();
const cors = require('cors');
const util = require('util');
const fs = require('fs');
const path = require('path');
const uuidv5 = require('uuid/v5');
var proxy = require('http-proxy-middleware');

// global configuration variable.
let config;

const REQUESTS = {
  USER_NAME: [{
    label: 'Uw gebruikersnaam',
    attributes: ['pbdf.sidn-pbdf.irma.pseudonym'],
  }],
  POSTCODE: [{
    label: 'Uw postcode',
    attributes: ['pbdf.gemeente.address.zipcode'],
  }],
  AGE:[ {
    label: 'Uw leeftijd',
    attributes: ['pbdf.gemeente.personalData.over18'],
  }],
  EMAIL: [
    {
      label: 'Uw emailadres of telefoonnummer',
      attributes: [
        'pbdf.pbdf.email.email',
        'pbdf.pbdf.mobilenumber.mobilenumber',
      ],
    },
  ],
  BSN: [
    {
      label: 'Uw voornaam',
      attributes: ['pbdf.gemeente.personalData.firstnames'],
    },
    {
      label: 'Uw achternaam',
      attributes: ['pbdf.gemeente.personalData.familyname'],
    },
    {
      label: 'Uw burgerservicenummer (BSN)',
      attributes: ['pbdf.gemeente.personalData.bsn'],
    },
  ],
};

const createIrmaRequest = (content) => {
  return {
    type: 'disclosing',
    content
  };

  // Example with the new request format (not working)
  // return {
  //   '@context': 'https://irma.app/ld/request/disclosure/v2',
  //   disclose: [[[{ type: 'pbdf.sidn-pbdf.irma.pseudonym' , value: null}]]],
  // };
};

const init = async () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY is not set');
  }

  try {
    // read the config file only once each session
    if (config === undefined) {
      const json = await util.promisify(fs.readFile)(
        process.env.CONFIG,
        'utf-8'
      );
      console.log('Using config', json);
      config = JSON.parse(json);
    }

    app.use(express.json());

    app.options('/vote', cors());
    app.post('/vote', cors(), vote);
    app.get('/stats', cors(), stats);
    // app.get("/getsession/user", cors(), irmaDiscloseUser);
    app.get('/getsession/postcode', cors(), irmaDisclosePostcode);
    app.get('/getsession/bsn', cors(), irmaDiscloseBsn);
    app.get('/getsession/age', cors(), irmaDiscloseAge);
    app.get("/getsession/email", cors(), irmaDiscloseEmail);
    app.get('/config', cors(), getConfig);

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(config.docroot));
      app.get('*', function(req, res) {
        console.log(req, res);
        res.sendFile(path.join(__dirname, config.docroot, 'index.html'));
      });
    } else {
      console.log('Using proxy to the react app for development');
      // proxy the root to the react app container in development mode
      app.use(
        '/',
        proxy({
          target: 'http://app:3000',
          changeOrigin: true,
        })
      );
    }

    app.listen(config.port, () =>
      console.log(
        `Voting app running in ${process.env.NODE_ENV || 'development'} mode.`
      )
    );
  } catch (e) {
    error(e);
  }
};

const irmaDiscloseRequest = async (req, res, requestType) => {
  const authmethod = 'publickey';
  const request = createIrmaRequest(requestType);

  console.log('irma.irmaDisclosePostcode called: ', {
    url: config.irma,
    request: JSON.stringify(request),
    authmethod,
  });

  try {
    console.log(irma);
    const session = await irma.startSession(
      config.irma,
      request,
      authmethod,
      process.env.PRIVATE_KEY,
      config.requestorname
    );

    res.json(session);
  } catch (e) {
    console.log('irma.startSession error:', JSON.stringify(e));
    error(e, res);
  }
};

async function irmaDiscloseEmail(req, res) {
  return irmaDiscloseRequest(req, res, REQUESTS.EMAIL);
}

async function irmaDisclosePostcode(req, res) {
  return irmaDiscloseRequest(req, res, REQUESTS.POSTCODE);
}

async function irmaDiscloseBsn(req, res) {
  return irmaDiscloseRequest(req, res, REQUESTS.BSN);
}

async function irmaDiscloseAge(req, res) {
  return irmaDiscloseRequest(req, res, REQUESTS.AGE);
}

const vote = async (req, res) => {
  try {
    const identHashed = uuidv5(req.body.identifier, config.uuid);
    let alreadyVoted = false;
    console.log('Voted with id: ', identHashed);
    res.json({ alreadyVoted, vote: req.body.vote });
  } catch (e) {
    error(e, res);
  }
};

const stats = async (req, res) => {
  try {
    const votes = 'here are the votes';
    res.json({ votes });
  } catch (e) {
    error(e, res);
  }
};

const getConfig = async (req, res) => {
  console.log('get config', JSON.stringify(config));
  res.json(config);
};

const error = (e, res) => {
  const jsonError = JSON.stringify(e);
  console.error('Node error', jsonError);
  if (res) {
    res.json({ error: jsonError });
  }
};

init();
