FROM node:alpine as builder
WORKDIR '/boc-music'
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run start