FROM node:20-alpine as base

WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
