#!/bin/sh

echo ">>> Start app in $NODE_ENV"

cd /app

echo "Starting DB Migration! ..."
npm run migrate:up

if [ "$NODE_ENV" == "development" ]; then
  npm run dev
elif [ "$NODE_ENV" == "test" ]; then
  npm run test
else
  npm run start
fi