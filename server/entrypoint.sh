#!/bin/sh

# Check if required environment variables are set
: "${POSTGRES_HOST?Environment variable POSTGRES_HOST is required}"
: "${POSTGRES_USER?Environment variable POSTGRES_USER is required}"
: "${POSTGRES_PASSWORD?Environment variable POSTGRES_PASSWORD is required}"
: "${POSTGRES_DATABASE?Environment variable POSTGRES_DATABASE is required}"
: "${POSTGRES_PORT?Environment variable POSTGRES_PORT is required}"
: "${JWT_ACCESS_SECRET?Environment variable JWT_ACCESS_SECRET is required}"
: "${JWT_REFRESH_SECRET?Environment variable JWT_REFRESH_SECRET is required}"
: "${JWT_CSRF_SECRET?Environment variable JWT_CSRF_SECRET is required}"
: "${ENCRYPTION_KEY?Environment variable ENCRYPTION_KEY is required}"
: "${ENCRYPTION_IV?Environment variable ENCRYPTION_IV is required}"
: "${GITHUB_CLIENT_ID?Environment variable GITHUB_CLIENT_ID is required}"
: "${GITHUB_CLIENT_SECRET?Environment variable GITHUB_CLIENT_SECRET is required}"
: "${PUBLIC_CLIENT_URL?Environment variable PUBLIC_CLIENT_URL is required}"
: "${PUBLIC_SERVER_URL?Environment variable PUBLIC_SERVER_URL is required}"

# Execute the command passed to the script
exec "$@"