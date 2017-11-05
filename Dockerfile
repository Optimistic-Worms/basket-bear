#use a base node image
FROM travisci/ci-garnet:packer-1503972846

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=8000

CMD npm postinstall

CMD npm start

EXPOSE 8000
