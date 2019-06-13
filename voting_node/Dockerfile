FROM node:10

COPY ./server /server
WORKDIR /server

ARG development

RUN npm install

COPY ./openstad /openstad

CMD ["npx", "nodemon", "index.js", "--verbose"]

EXPOSE 80
