const pgp = require("pg-promise/typescript/pg-promise")();

const db = pgp("postgres://postgres:hj21kjy@localhost/postgres");

doTest();

async function doTest() {
  try {
    await init();
  } catch (e) {}

  await vote("kh23-4k2j3", "tech");

  await stats();

  console.log("Vote test done");
}

async function init() {
  try {
    await db.none(
      "CREATE TABLE votes (name VARCHAR (50) UNIQUE NOT null, count INT NOT null)"
    );
    await db.none("CREATE TABLE voted (ident VARCHAR (50) UNIQUE NOT null)");

    await db.none(
      "INSERT INTO votes (name, count) VALUES ('community', 0), ('tech', 0), ('zen', 0)"
    );
    console.log("Initialized");
  } catch (error) {}
}

async function vote(ident, name) {
  try {
    await db.none("INSERT INTO voted (ident) VALUES ($1)", ident);
    await db.none("UPDATE votes SET count=count+1 WHERE name=$1", name);
    console.log("Voted");
  } catch (e) {
    console.error("");
  }
}

async function stats() {
  try {
    const data = await db.many("SELECT * FROM votes");

    const results = {
      votes: data.reduce((acc, item, i) => {
        acc[item.name] = item.count;
        return acc;
      }, {})
    };

    console.log("Stats", results);
  } catch (e) {
    console.error("Err");
  }
}
