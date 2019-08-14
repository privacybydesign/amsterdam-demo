const pgp = require("pg-promise/typescript/pg-promise")();

// Preparing the connection details:
const cn = "postgres://postgres:hj21kjy@localhost/postgres";

// Creating a new database instance from the connection details:
const db = pgp(cn);

go();

async function go() {
  try {
    await init();
  } catch (e) {}

  console.log("DONE");
}

async function init() {
  try {
    await db.none("DROP TABLE voted");

    console.log("Table voted dropped");
  } catch (error) {
    console.error("ERROR", error);
  }
  try {
    await db.none("DROP TABLE votes");

    console.log("Table votes dropped");
  } catch (error) {
    console.error("ERROR", error);
  }
}
