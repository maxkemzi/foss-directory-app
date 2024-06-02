FROM node:20-alpine as base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

FROM base AS prod

RUN npm run build

CMD ["npm", "start"]

FROM base AS dev

CMD ["npm", "run", "dev"]
