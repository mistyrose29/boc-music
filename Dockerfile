FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
COPY . /app
CMD npm start
EXPOSE 3000