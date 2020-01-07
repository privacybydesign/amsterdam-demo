# Repository di_node_container

## Config

The `CONFIG` environment variable points to a configuration file.

```javascript
{
    /* The requestor defined in irmaserver.json in the IRMA server */
    "requestorname": "openstad_voting_pk",

    /* Every poll must have it's unique uuid, use a generator to create one */
    "uuid": "06c5a013-4e71-439a-b8da-65e35b6419f0",

    /* URL of the IRMA server */
    "irma": "https://attr.auth.amsterdam.nl",

    /* URL of Node server, optional with port number */
    "nodeUrl": "http://localhost:8000",

    /* Port number the Node server listens to */
    "port": 8000,

    /* Document root of site to serve, only for demo */
    "docroot": "../openstad",

    /* Keys of voting options */
    "voting_options": ["community", "tech", "zen"]
}
```

## Install

```shell
cd voting_node
docker build -t voting_node .
```

## Run

1. Make sure IRMA is running (see `https://gitlab.com/stanguldemond/irma_server_container`)
2. Add the URL of IRMA to `server/*.json`)
3. Make sure PostgreSQL is running and a user is created:

```shell
cd dev/db
./postgres.sh
```

## Run locally without Docker

install ngrok

- run ./dev/ngrok/ngrok.sh
- copy the url generated for port 8088 and set it in ./dev/config-dev.json (`irma` setting)
- the ngrok tunnel will be available for 8 hours or until the ngrok session is exited. The update of the `irma` setting
  in config-dev.json has to be done each time the ngrok session expires or is restarted.

create and configure the certificates

- run ./dev/keygen.sh to generate the certificates (public_key.pem en private_key.pem) in ./dev/keypair
- in [irma_server_container](https://gitlab.com/stanguldemond/irma_server_container) project:
  - copy the public_key.pem to the irma_server_container in de config folder
  - configure "key_file": "./config/public_key.pem" in ./config/irmaserver.json
- this project:
  - copy private_key.pem to ./dev/
  - copy

```shell
cd voting_node/server
npm install
cd ../../dev
./start.sh
```

## Run production mode

```shell
cd voting_node
docker run --rm -p80:8000 -e NODE_ENV=production -e CONFIG=config-prod.json -e PRIVATE_KEY="$(cat ../dev/private_key.pem)" -e POSTGRES_HOST=localhost -e POSTGRES_DATABASE=postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=hj21kjy --name voting_container voting_node
```

Replace POSTGRES_HOST=localhost with IP address of Postgres.

## Run development mode

```shell
cd voting_node
cp ../dev/config-dev.json server
docker build -t voting_node .
docker run -it --rm -p80:8000 -e CONFIG=config-dev.json -e PRIVATE_KEY="$(cat ../dev/private_key.pem)" -e POSTGRES_HOST=localhost -e POSTGRES_DATABASE=postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=hj21kjy --name voting_container voting_node
```

Replace POSTGRES_HOST=localhost with IP address of Postgres.
