## Repository di_node_container

### Install

```shell
cd voting_node
docker build -t voting_node .
```

### Run

```shell
cd voting_node
docker run -it -p8088:8088 voting_node
```

### Run local

```shell
cd voting_node/server
npm install
npx nodemon index.js
```
