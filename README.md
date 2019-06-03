## Repository di_node_container

### Install

- Install ngrok: https://ngrok.com/download

```shell
cd node
npm install
```

### Install key pair

```shell
./keygen.sh
```

### Run ngrok

```shell
cd irma_dev
./ngrok.sh
```

- Copy-paste the ngrok forwarding url port 8088 to `irmaserver.json`.

### Run IRMA

Make sure no IRMA is running.

```shell
cd irma_dev
./irma.sh
```

### Run Nodejs

```shell
cd node
npx nodemon indexjs
```
