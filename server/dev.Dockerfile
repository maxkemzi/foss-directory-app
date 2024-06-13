FROM node:20-alpine as base

WORKDIR /app

EXPOSE 5000

CMD ["npm", "run", "dev"]
