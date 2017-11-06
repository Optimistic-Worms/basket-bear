#use a base node image
FROM 767596259046.dkr.ecr.us-east-2.amazonaws.com/basket-starter:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=8000

CMD npm start

EXPOSE 8000
