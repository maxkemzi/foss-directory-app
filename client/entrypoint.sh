#!/bin/sh

# Check if required environment variables are set
: "${CLIENT_URL?Environment variable CLIENT_URL is required}"
: "${API_URL?Environment variable API_URL is required}"
: "${NEXT_PUBLIC_SERVER_URL?Environment variable NEXT_PUBLIC_SERVER_URL is required}"

# Execute the command passed to the script
exec "$@"