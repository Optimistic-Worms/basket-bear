#use a base node image
FROM nphavens/basket-starter

WORKDIR /app

COPY . /app

ENV PORT=8000

RUN npm install

#default command, only run if not in test env
CMD npm start

EXPOSE 8000
