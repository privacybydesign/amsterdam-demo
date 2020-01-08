FROM mhart/alpine-node:12

RUN adduser -D irma

COPY ./server/package*.json /server/
WORKDIR /server

RUN npm install

COPY ./server /server
COPY ./web /web

USER irma

CMD ["npx", "nodemon", "index.js", "--verbose"]

EXPOSE 8000
