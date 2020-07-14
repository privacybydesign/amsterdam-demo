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
  USER_NAME: [["pbdf.sidn-pbdf.irma.pseudonym"]],

  POSTCODE: [["pbdf.gemeente.address.zipcode"]],

  AGE: [["pbdf.gemeente.personalData.over18"]],

  EMAIL: [["pbdf.pbdf.email.email"], ["pbdf.pbdf.mobilenumber.mobilenumber"]],

  BSN: [
    ["pbdf.gemeente.personalData.fullname", "pbdf.gemeente.personalData.bsn"],
  ],
};

/**
 * Use this call to check the request:
 * `curl -H "Content-Type: application/json" -H 'X-IRMA-MinProtocolVersion: "2.4"' -H 'X-IRMA-MaxProtocolVersion: "2.5"' https://acc.attr.auth.amsterdam.nl/irma/session/zhvALcNoCbCyU0MMZNz5`
 * `curl -H "Content-Type: application/json" -H 'X-IRMA-MinProtocolVersion: "2.4"' -H 'X-IRMA-MaxProtocolVersion: "2.5"' http://localhost:8088/irma/session/WJGQXzbdepNfUg1dc3nT`
 *
 * The result should look like `{"@context":"https://irma.app/ld/request/disclosure/v2","context":"AQ==","nonce":"VItsL+3+GiBHyIt1hIRwSQ==","protocolVersion":"2.5","disclose":[[["pbdf.sidn-pbdf.irma.pseudonym"]]]}`
 */

const createIrmaRequest = (content) => {
  return {
    "@context": "https://irma.app/ld/request/disclosure/v2",
    disclose: [[...content]],
  };
};

const init = async () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }

  try {
    // read the config file only once each session
    if (config === undefined) {
      const json = await util.promisify(fs.readFile)("config.json", "utf-8");
      console.log("Using config", json);
      config = JSON.parse(json);
    }

    app.use(express.json());

    app.get("/getsession/postcode", cors(), irmaDisclosePostcode);
    app.get("/getsession/bsn", cors(), irmaDiscloseBsn);
    app.get("/getsession/age", cors(), irmaDiscloseAge);
    app.get("/getsession/email", cors(), irmaDiscloseEmail);
    app.get("/config", cors(), getConfig);
    console.log("use express");

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(config.docroot));
      app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, config.docroot, "index.html"));
      });
    } else {
      console.log("Using proxy to the react app for development");
      // proxy the root to the react app container in development mode
      app.use(
        "/",
        proxy({
          target: "http://fe:9000",
          changeOrigin: true,
        })
      );
    }

    app.listen(config.port, () =>
      console.log(
        `Di-demo backend running in ${
          process.env.NODE_ENV || "development"
        } mode.`
      )
    );
  } catch (e) {
    console.log(e);
    error(e);
  }
};

const irmaDiscloseRequest = async (req, res, requestType, id) => {
  const authmethod = "publickey";
  const request = createIrmaRequest(requestType, req.query.clientReturnUrl);

  console.log("irma.irmaDiscloseRequest called: ", {
    url: config.irma,
    request: JSON.stringify(request),
    authmethod,
  });

  try {
    const session = await irma.startSession(
      config.irma,
      request,
      authmethod,
      process.env.PRIVATE_KEY,
      config.requestorname
    );

    console.log("session result", session);
    res.json(session);
  } catch (e) {
    console.log("irma.startSession error:", JSON.stringify(e));
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
