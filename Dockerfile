#use a base node image
FROM node:7

WORKDIR /app

COPY package.json /app

RUN npm install
RUN npm test

COPY . /app

ENV PORT=8000

CMD npm start

EXPOSE 8000
