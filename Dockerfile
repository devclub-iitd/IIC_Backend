FROM node:latest

RUN mkdir /code
WORKDIR /code

RUN apt-get update
RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

