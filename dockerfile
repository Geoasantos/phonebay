FROM node:14.15.1-buster
WORKDIR /usr/src/app
RUN npm install
EXPOSE 8080
