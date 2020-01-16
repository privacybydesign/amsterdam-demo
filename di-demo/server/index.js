const express = require("express");
const irma = require("@privacybydesign/irmajs");
const app = express();
const cors = require("cors");
const util = require("util");
const fs = require("fs");
const path = require("path");
const uuidv5 = require("uuid/v5");
var proxy = require("http-proxy-middleware");

// global configuration variable.
let config;

const REQUESTS = {
  EMAIL: {
    label: "Uw MyIRMA gebruikersnaam",
    attributes: ["pbdf.sidn-pbdf.irma.pseudonym"]
    // attributes: ["pbdf.pbdf.email.email"],
    // attributes: ["pbdf.gemeente.personalData.bsn"],
    // attributes: ["pbdf.gemeente.address.zipcode"],
    // attributes: ["pbdf.pbdf.mobilenumber.mobilenumber"],
  }
};

const createIrmaRequest = ({ label, attributes }) => {
  return {
    type: "disclosing",
    content: [{ label, attributes }]
  };
};

const init = async () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }

  try {
    // read the config file only once each session
    if (config === undefined) {
      const json = await util.promisify(fs.readFile)(
        process.env.CONFIG,
        "utf-8"
      );
      console.log("Using config", json);
      config = JSON.parse(json);
    }

    app.use(express.json());

    app.options("/vote", cors());
    app.post("/vote", cors(), vote);
    app.get("/stats", cors(), stats);
    app.get("/getsession/email", cors(), irmaDiscloseEmail);
    app.get("/config", cors(), getConfig);

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(config.docroot));
      app.get('*', function (req, res) {
        console.log(req,res);
        res.sendFile(path.join(__dirname, config.docroot, 'index.html'));
      });
    } else {
      console.log('Using proxy to the react app for development')
      // proxy the root to the react app container in development mode
      app.use(
        "/",
        proxy({
          target: "http://app:3000",
          changeOrigin: true
        })
      );
    }

    app.listen(config.port, () =>
      console.log(
        `Voting app running in ${process.env.NODE_ENV || "development"} mode.`
      )
    );
  } catch (e) {
    error(e);
  }
};

async function irmaDiscloseEmail(req, res) {
  const authmethod = "publickey";
  const request = createIrmaRequest(REQUESTS.EMAIL);

  console.log("irma.irmaDiscloseEmail called: ", {
    url: config.irma,
    request: JSON.stringify(request),
    authmethod
  });

  try {
    const session = await irma.startSession(
      config.irma,
      request,
      authmethod,
      process.env.PRIVATE_KEY,
      config.requestorname
    );

    res.json(session);
  } catch (e) {
    error(e, res);
  }
}

const vote = async (req, res) => {
  try {
    const identHashed = uuidv5(req.body.identifier, config.uuid);
    let alreadyVoted = false;
    console.log("Voted with id: ", identHashed);
    res.json({ alreadyVoted, vote: req.body.vote });
  } catch (e) {
    error(e, res);
  }
};

const stats = async (req, res) => {
  try {
    const votes = "here are the votes";
    res.json({ votes });
  } catch (e) {
    error(e, res);
  }
};

const getConfig = async (req, res) => {
  console.log("get config", JSON.stringify(config));
  res.json(config);
};

const error = (e, res) => {
  const jsonError = JSON.stringify(e);
  console.error("Node error", jsonError);
  if (res) {
    res.json({ error: jsonError });
  }
};

init();
