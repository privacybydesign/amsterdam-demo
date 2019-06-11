# IRMA demo

## Install IRMA demo

### Install ngrok

- Install ngrok: https://ngrok.com/download


### Install Node server

```shell
cd node
npm install
```

### Install key pair

```shell
./keygen.sh
```

## Run IRMA demo

### Run ngrok

```shell
cd local
./ngrok.sh
```

- Copy-paste the ngrok forwarding url port 8088 to `local/irmaserver.json`, to the `irmaServer` variable in `demo.js` and `index.js`,
- Copy-paste the ngrok forwarding url port 8000 to `node_server/public/js/demo.js`, to the `voteHost` variable in `demo.js`.

### Run IRMA

Make sure IRMA is not already running.

```shell
cd local
./irma.sh
```

### Run Nodejs

```shell
cd local
./node.sh
```

Visit the ngrok forwarding url to localhost port 8000.
