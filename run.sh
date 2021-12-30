#!/bin/bash

echo "source .env"
. .env

echo "start app..."
deno run \
  --allow-net \
  --allow-env=DB_USER,DB_PASSWORD,DB_NAME,DB_HOST,DB_PORT \
  main.ts
