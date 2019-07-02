const express = require("express");
const irma = require("@privacybydesign/irmajs");
const app = express();
const cors = require("cors");
const util = require("util");
const fs = require("fs");
const uuidv5 = require("uuid/v5");
const appNamespaceUuid = "06c5a013-4e71-439a-b8da-65e35b6419f0";
const pgp = require("pg-promise")();

let skey;
let isDev;
let config;
let db;

init();

async function init() {
  try {
    db = pgp("postgres://postgres:hj21kjy@localhost/postgres");
    await initDatabase();

    skey = await util.promisify(fs.readFile)("config/private_key.pem", "utf-8");

    isDev = process.env.STAGE === "dev";

    const configFileName = isDev
      ? "config/config-dev.json"
      : "config/config-prod.json";
    const json = await util.promisify(fs.readFile)(configFileName, "utf-8");
    config = JSON.parse(json);

    console.log("config", config);

    app.use(express.json());

    app.get("/hello", (req, res) => res.send("Hello World!"));

    app.options("/vote", cors());
    app.post("/vote", cors(), vote);
    app.get("/stats", cors(), stats);
    app.get("/getsession", cors(), irmaSession);
    app.get("/config", cors(), getConfig);

    app.use(express.static("../openstad"));

    app.listen(config.port, () =>
      console.log(`Voting app listening on port ${config.port}.`)
    );
  } catch (e) {
    error(e);
  }
}

async function irmaSession(req, res) {
  const authmethod = "publickey";
  const requestorname = "openstad_voting_pk";
  const request = {
    type: "disclosing",
    content: [
      {
        label: "Uw MyIRMA gebruikersnaam",
        attributes: ["pbdf.pbdf.mijnirma.email"]
      }
    ]
  };

  console.log("irma.startSession", {
    url: config.irma,
    request: JSON.stringify(request),
    authmethod,
    requestorname
  });

  try {
    const session = await irma.startSession(
      config.irma,
      request,
      authmethod,
      skey,
      requestorname
    );
    res.json(session);
  } catch (e) {
    error(e, res);
  }
}

async function vote(req, res) {
  try {
    const identHashed = uuidv5(req.body.email, appNamespaceUuid);
    let alreadyVoted = false;

    try {
      await db.none("INSERT INTO voted (ident) VALUES ($1)", identHashed);
      await db.none(
        "UPDATE votes SET count=count+1 WHERE name=$1",
        req.body.vote
      );
      console.log("Voted", req.body.vote);
    } catch (e) {
      alreadyVoted = true;
      console.error("Not voted");
    }

    res.json({ alreadyVoted, vote: req.body.vote });
  } catch (e) {
    error(e, res);
  }
}

async function stats(req, res) {
  try {
    const data = await db.many("SELECT * FROM votes");

    const votes = data.reduce((acc, item, i) => {
      acc[item.name] = item.count;
      return acc;
    }, {});

    res.json({ votes });
  } catch (e) {
    error(e, res);
  }
}

async function getConfig(req, res) {
  res.json(config);
}

function error(e, res) {
  console.error("Node error", e);
  if (res) {
    res.json({ error: JSON.stringify(e) });
  }
}

async function initDatabase() {
  try {
    await db.none(
      "CREATE TABLE votes (name VARCHAR (50) UNIQUE NOT null, count INT NOT null)"
    );
    await db.none("CREATE TABLE voted (ident VARCHAR (50) UNIQUE NOT null)");

    await db.none(
      "INSERT INTO votes (name, count) VALUES ('community', 0), ('tech', 0), ('zen', 0)"
    );
    console.log("Database initialized");
  } catch (error) {}
}
