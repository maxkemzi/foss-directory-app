FROM node:20-alpine as base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

FROM base AS prod

CMD ["npm", "start"]

FROM base AS dev

CMD ["npm", "run", "dev"]
