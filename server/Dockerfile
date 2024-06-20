FROM node:20-alpine as base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm install

# Production image, copy required files and run server
FROM base AS runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Make the entrypoint script executable
RUN chmod +x ./entrypoint.sh

EXPOSE 5000

ENV PORT 5000

# Set the entrypoint to the script
ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "start"]
