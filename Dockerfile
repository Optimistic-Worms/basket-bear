#use a base node image
FROM 767596259046.dkr.ecr.us-east-1.amazonaws.com/basket-starter:latest

WORKDIR /app

COPY package.json /app

RUN npm install --silent

COPY . /app

ENV PORT=8000

#default command, only run if not in test env
CMD npm start

EXPOSE 8000
