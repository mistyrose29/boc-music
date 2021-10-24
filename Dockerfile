FROM node:alpine as builder
WORKDIR '/boc-music'
COPY package.json .
RUN npm update -g
RUN npm install
COPY . .
RUN npm run start