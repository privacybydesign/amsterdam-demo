FROM node:10

COPY ./server /server
COPY ./openstad /openstad
WORKDIR /server

RUN npm install
CMD ["npx", "nodemon", "index.js", "--verbose"]