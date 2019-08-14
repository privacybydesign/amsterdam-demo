#!/usr/bin/env bash

mkdir keypair
openssl genrsa -out keypair/private_key.pem 4096
openssl rsa -pubout -in keypair/private_key.pem -out keypair/public_key.pem
