#!/usr/bin/env bash
docker run -it --rm --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=hj21kjy -v $PWD/data:/var/lib/postgresql/data -d postgres
