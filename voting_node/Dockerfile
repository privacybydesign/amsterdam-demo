FROM node:10

COPY ./server/*.json /server/
WORKDIR /server

RUN npm install

COPY ./server /server
COPY ./openstad /openstad

CMD ["npx", "nodemon", "index.js", "--verbose"]

EXPOSE 80
