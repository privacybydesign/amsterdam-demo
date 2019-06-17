FROM node:10

COPY ./server/package*.json /server/
WORKDIR /server

ARG development

RUN npm install

COPY ./server /server
COPY ./openstad /openstad

CMD ["npx", "nodemon", "index.js", "--verbose"]

EXPOSE 80
