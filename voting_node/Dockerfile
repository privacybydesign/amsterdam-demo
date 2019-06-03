FROM node:10

COPY ./server /code
WORKDIR /code

RUN npm install

CMD ["npx", "nodemon", "index.js"]
