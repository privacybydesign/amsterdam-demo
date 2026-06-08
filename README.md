# Digitale Identiteit - IRMA Demo site

This project provides the source code of the Amsterdam IRMA demo website.
It consists of a React frontend and NodeJS backend which is in charge of communicating with an IRMA server.
A locally running IRMA server can be started with Docker Compose.

## Configure

Make sure to configure the backend properly. By default it is configured to connect to the an IRMA server running on localhost:8080. To be able to connect you will need to create a public/private keypair.

```sh
mkdir -p .secrets
pushd .secrets
openssl genrsa -out private.key 4096
openssl rsa -in private.key -pubout -out public.crt
popd
```

## Install npm packages

```sh
pushd client; npm install; popd
pushd server; npm install; popd
```

## Run with docker-compose

To simply run the demo website and an IRMA server, run:

```sh
IRMA_PRIVATE_KEY=$(cat .secrets/private.key) docker-compose up
```

To enable communication with the Yivi app, please specify the `IRMA_SERVER_URL`.

```sh
IRMA_SERVER_URL=http://[your_local_ip]:8080 IRMA_PRIVATE_KEY=$(cat .secrets/private.key) docker-compose up
```
