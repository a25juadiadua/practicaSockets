FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

WORKDIR /app/back

CMD ["nodemon", "server.js"]

RUN npm install -g nodemon