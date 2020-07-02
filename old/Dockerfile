FROM node:10.15-stretch AS builder
LABEL maintainer="datapunt@amsterdam.nl"

WORKDIR /app

COPY ./client/package.json ./client/yarn.lock /app/

RUN yarn

# Build dependencies
COPY ./client /app/

# Build
ENV NODE_ENV=production
RUN yarn build


FROM mhart/alpine-node:12

RUN adduser -D irma

COPY ./server/package*.json /server/
WORKDIR /server

RUN npm install

COPY ./server /server

COPY --from=builder /app/build/. /client

USER irma

CMD ["npx", "nodemon", "index.js", "--verbose"]

EXPOSE 8000
