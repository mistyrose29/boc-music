FROM node:alpine as builder
WORKDIR '/boc-music'
COPY package.json .
RUN npm install -g npm@8.1.1
RUN npm install
COPY ./ ./
RUN npm run start