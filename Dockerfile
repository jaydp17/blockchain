FROM node:8.9-alpine

LABEL maintainer Jaydeep Solanki <jaydp17@gmail.com> (https://jaydp.com)

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

COPY . /app/

CMD node src/index.js
