FROM node:16
WORKDIR /usr/src/experiments-app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

EXPOSE 8080

CMD ["node", "server/production-server.js"]
