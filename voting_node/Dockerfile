FROM node:10

COPY ./server /server
COPY ./web /web

WORKDIR /server

RUN npm install

CMD ["npx", "nodemon", "index.js", "--verbose"]
