
   
FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g pm2

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "start","npm","--name","theme-palest","--","run","start"]