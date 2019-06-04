const irma = require('@privacybydesign/irmajs');
const fs = require("fs")
const skey = fs.readFileSync('./config/private_key.pem', 'utf-8')

module.exports = {
  start
}

const server = 'https://acc.fixxx10.amsterdam.nl';
// const server = 'http://localhost:8088';


const request = {
  'type': 'disclosing',
  'content': [{
    'label': 'Over 18',
    'attributes': [ 'irma-demo.MijnOverheid.ageLower.over18' ]
  }]
};

const authmethod = "publickey";
const requestorname = "openstad_voting_pk"
const key = skey;

function start() {
  return irma.startSession(server, request, authmethod, key, requestorname)
    .catch(err => console.error(err))
}

