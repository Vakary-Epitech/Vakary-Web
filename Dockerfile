FROM node:current
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install 
COPY . .
EXPOSE 80
