FROM node:20-alpine as base

WORKDIR /app

COPY . .

EXPOSE 5000

RUN npm install

CMD ["npm", "start"]
