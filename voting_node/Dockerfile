FROM mhart/alpine-node:12

COPY ./server/*.json /server/
WORKDIR /server

RUN npm install

COPY ./server /server
COPY ./openstad /openstad

CMD ["npx", "nodemon", "index.js", "--verbose"]

EXPOSE 80
