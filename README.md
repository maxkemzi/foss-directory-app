# FOSS directory
A team collaboration full-stack app with real-time chat.

**Front-end**: Typescript, Next.js, TailwindCSS, Socket.io, React-hook-form.\
**Back-end**: Typescript, Node.js, Express.js, PostgreSQL, Websockets, Docker.

This project was inspired by a project of mine called [Cooper](https://github.com/maxkemzi/cooper).

## Features:
- Integration of github account for quick project creation
- Specifying the needed roles for the project
- Search for projects by name and tags
- Real-time chat for each project between project members
- Send a request to join a project for a specific role
- Account deletion
- Project deletion

## Build instructions
### 1. Create `.env` files in the client and server directories.
Each directory has `.env.example` file.
### 2. Run `docker compose` command in the root directory.
#### Production:
```
docker compose up
```
#### Development:
```
docker compose -f dev.docker-compose.yml up
```
