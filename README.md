## Repository di_node_container

### Install

```shell
cd voting_node
docker build -t voting_node .
```

### Run production mode

```shell
cd voting_node
docker run -it -p80:80 voting_node
```

### Run development mode

```shell
cd voting_node
docker run -it -p80:80 -e STAGE=dev voting_node
```

### Run local

```shell
cd voting_node/server
npm install
cd ..
./start.sh
```
