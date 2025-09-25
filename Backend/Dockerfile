FROM node:20

WORKDIR /usr/src/api

RUN apt-get update && apt-get install -y ffmpeg

COPY package*.json ./

COPY . .

RUN npm install

COPY prisma ./prisma/

EXPOSE 4000

CMD bash -c "\
  npm install && \
  npx prisma generate && \
  npx prisma migrate dev --name init && \
  npx prisma migrate deploy && \
  npm run dev \
"

# CMD ["npm", "run", "dev"]
# npx prisma migrate reset --force && \