FROM node:alpine as builder
WORKDIR '/boc-music'
COPY package.json .
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD ["npm", "run", "start"]