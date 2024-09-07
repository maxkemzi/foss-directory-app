FROM node:20-alpine as base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy required files and run server
FROM base AS runner
WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/.env.example ./build
COPY --from=builder /app/entrypoint.sh ./

# Make the entrypoint script executable
RUN chmod +x ./entrypoint.sh

EXPOSE 5000

ENV PORT 5000

# Set the entrypoint to the script
ENTRYPOINT ["./entrypoint.sh"]

CMD ["node", "./build/index.js"]
