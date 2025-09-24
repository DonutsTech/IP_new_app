#!/bin/bash

npm install
npx prisma migrate reset
npx prisma migrate dev --name init
npx prisma generate
npx prisma migrate deploy
npm run dev