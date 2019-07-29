# Integrating IRMA voting in your website

This document describes `js/irma-vote.js` and `server/index.js` and how to use it in your website.

This file is part of the IRMA demo voting website repository, so you can
see how it is used in practice.

The IRMA demo voting website needs a running IRMA server and Postgres server.

There are two options: you use the production IRMA and Postgres, or use
a locally installed IRMA and Postgres.

## Installing IRMA and Postgres locally

Only for trying out the demo with a locally installed IRMA and Postgres.

### IRMA

See `README.md` for installing the IRMA demo voting website.

Visit `https://gitlab.com/stanguldemond/irma_server_container` for
installing IRMA.

### Postgres

For testing, you can run `postgres.sh` in the `dev/db` directory to run the Postgres Docker.
Set the `POSTGRES_*` environment variables to the local instance when running the demo (see below).

## Setting up an IRMA requestor key pair

When running a local IRMA server, you can use the keypair in de repository and don't need to set up a key pair.

When using a production IRMA server, you'll need to generate a key pair.
This way, the communication between the webserver and the IRMA server can be encrypted.
Your webserver will have the private key and the IRMA server will have the public key. 

In the `dev` directory, run `keygen.sh`. A new `keypair` directory will be created with the public
and private keys. Store `private_key.pem` in the `PRIVATE_KEY` environment variable.

The `public_key.pem` should be installed on the IRMA server.

Clone IRMA (`https://gitlab.com/stanguldemond/irma_server_container`) and update the
`irmaserver.json` file and add this structure to the `requestors` key:

```javascript
        "openstad_voting": {
            "auth_method": "publickey",
            "key_file": "./config/openstad_voting.public.pem"
        },
```

`openstad_voting` is the key that's also used as the `requestorname` in the configuration file.

`key_file` is the path to the generated `openstad_voting.public.pem` file (renamed from `public_key.pem` file).

Make a pull request to have your public key integrated in the main IRMA server.

## Configuration

In `voting_node/server', you'll find `index.js` and `config-prod.json` files.

`index.js` is de Node.js voting script and  `config-prod.json` is the configuration file.

Before running the Node.js script, the configuration must be set up correctly.

The explanation of `config-prod.json`:

```javascript
{
    /* The requestor defined in irmaserver.json in the IRMA server */
    "requestorname": "openstad_voting_pk",

    /* Every poll must have it's unique uuid, use a generator to create one */
    "uuid": "06c5a013-4e71-439a-b8da-65e35b6419f0",

    /* URL of the IRMA server */
    "irma": "https://attr.auth.amsterdam.nl",

    /* URL of Node server, without port number */
    "node": "http://localhost",

    /* Port number of Node server */
    "port": 8000,

    /* Document root of site to serve, only for demo */
    "docroot": "../openstad",

    /* Keys of voting options */
    "voting_options": ["community", "tech", "zen"]
}
```

For the Node.js server to work, it needs environment variables set up.

Environment variables explained:

`NODE_ENV`: set to `production` to run Node.js and npm in production mode.

`CONFIG`: path to the configuration file (see above).

`PRIVATE_KEY`: The contents of the private key for communicating with IRMA
(See Setting up a IRMA key pair below)

`POSTGRES_HOST`, `POSTGRES_DATABASE`, `POSTGRES_USER`, `POSTGRES_PASSWORD`:
credentials for the Postgres database.

## Running Node.js JavaScript

The Node.js file `index.js` takes care of the communication with the IRMA server.

If the configuation file is set up and the environment variables are known, you can run this command to start Node.js:

```bash
docker run --rm -p80:8000 -e NODE_ENV=production -e CONFIG=config-prod.json -e PRIVATE_KEY="$(cat ../dev/private_key.pem)" -e POSTGRES_HOST=localhost -e POSTGRES_DATABASE=postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=hj21kjy --name voting_container voting_node
```

Replace the environment variables with the correct ones.

## Including Browser JavaScript

In `voting_node/openstad/js`, you'll find three JavaScript files:

`demo.js` is tightly integrated to the IRMA voting demo.

`irma.js`  is the official JavaScript library provided by IRMA.

`irma-vote.js` is a library to enable voting.

To enable voting with IRMA on your site, you should include the last two files.

```html
    <script src="js/irma.js" async></script>
    <script src="js/irma-vote.js" async></script>
```

Using a bundler and including the bundle is also possible.
The files don't support JavaScript modules at this time.

For a description of the JavaScript API, see the file `JS-API.md`.
