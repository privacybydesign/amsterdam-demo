console.log("Hello from Node server")

var irma = require('./irma');
irma.start().then((obj) => console.log(obj))