#!/usr/bin/env bash

cd ../voting_node/server
STAGE=dev POSTGRES_HOST=localhost POSTGRES_DATABASE=postgres POSTGRES_USER=postgres POSTGRES_PASSWORD=hj21kjy npx nodemon index.js
