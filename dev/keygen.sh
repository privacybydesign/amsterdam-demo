#!/usr/bin/env bash

openssl genrsa -out config/private_key.pem 4096
openssl rsa -pubout -in config/private_key.pem -out config/public_key.pem
