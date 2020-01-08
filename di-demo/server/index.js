const express = require("express");
const irma = require("@privacybydesign/irmajs");
const app = express();
const cors = require("cors");
const util = require("util");
const fs = require("fs");
const uuidv5 = require("uuid/v5");
const pgp = require("pg-promise")();

let config;
let db;

init();

async function init() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }

  try {
    db = pgp(
      `postgres://${process.env.POSTGRES_USER}:${
        process.env.POSTGRES_PASSWORD
      }@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}`
    );

    const json = await util.promisify(fs.readFile)(process.env.CONFIG, "utf-8");
    config = JSON.parse(json);

    await initDatabase();

    console.log("Using config", config);

    app.use(express.json());

    app.options("/vote", cors());
    app.post("/vote", cors(), vote);
    app.get("/stats", cors(), stats);
    app.get("/getsession", cors(), irmaSession);
    app.get("/config", cors(), getConfig);

    if (config.docroot) {
      app.use(express.static(config.docroot));
    }

    app.listen(config.port, () =>
      console.log(
        `Voting app running in ${process.env.NODE_ENV || "development"} mode.`
      )
    );
  } catch (e) {
    error(e);
  }
}

async function irmaSession(req, res) {
  const authmethod = "publickey";
  const request = {
    type: "disclosing",
    content: [
      {
        label: "Uw MyIRMA gebruikersnaam",
        attributes: ["pbdf.pbdf.mijnirma.email", "pbdf.sidn-pbdf.irma.pseudonym"]
      }
    ]
  };

  console.log("irma.startSession", {
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

async function vote(req, res) {
  try {
    const identHashed = uuidv5(req.body.identifier, config.uuid);
    let alreadyVoted = false;

    try {
      await db.none("INSERT INTO voted (ident) VALUES ($1)", identHashed);
      await db.none(
        "UPDATE votes SET count=count+1 WHERE name=$1",
        req.body.vote
      );
      console.log("Voted");
    } catch (e) {
      alreadyVoted = true;
      console.log("Not voted");
    }

    res.json({ alreadyVoted, vote: req.body.vote });
  } catch (e) {
    console.error("Could not connect to database.");
    error(e, res);
  }
}

async function stats(req, res) {
  try {
    const data = await db.many("SELECT * FROM votes");

    const votes = data.reduce((acc, item) => {
      acc[item.name] = item.count;
      return acc;
    }, {});

    res.json({ votes });
  } catch (e) {
    console.error("Could not connect to database.");
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

    const votingOptions = config.voting_options
      .map(opt => `('${opt}', 0)`)
      .join(", ");

    await db.none(`INSERT INTO votes (name, count) VALUES ${votingOptions}`);
    console.log("Database initialized");
  } catch (error) {}
}
