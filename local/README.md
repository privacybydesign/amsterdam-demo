## Repository di_node_container

### Install

- Install ngrok: https://ngrok.com/download

- Copy-paste the ngrok forwarding url port 8088 to `irmaserver.json`, to the `irmaServer` variable in `demo.js` and `index.js`,
- Copy-paste the ngrok forwarding url port 8000 to `node_server/public/js/demo.js`, to the `voteHost` variable in `demo.js`.


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
