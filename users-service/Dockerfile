FROM node:16.20.0

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src src
COPY conf conf

ENV ENV=local

ENTRYPOINT [ "npm", "start" ]
