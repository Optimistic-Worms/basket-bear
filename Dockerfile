#use a base node image
FROM nphavens/basket-starter

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=8000

#default command, only run if not in test env
CMD npm start

EXPOSE 8000
