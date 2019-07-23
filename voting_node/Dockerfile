FROM mhart/alpine-node:12

RUN adduser -D irma

COPY ./server/*.json /server/
WORKDIR /server

RUN npm install

COPY ./server /server
COPY ./openstad /openstad

USER irma

CMD ["npx", "nodemon", "index.js", "--verbose"]

EXPOSE 8000
