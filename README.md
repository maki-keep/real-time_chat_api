# real-time_chat_api

Real-Time Chat API that manages users, conversations, and messages, by REST endpoints. The app includes a WebSocket upgrade for real-time events.  

## Installation

Fork this repository into your system.  
Install the dependencies using npm:  

```bash
npm install
```

## Building the Application

Build the application by compiling TypeScript:  

```bash
npm run build
```

## Database Setup & Migration

Copy `.env.example` to `.env` and set your database credentials.  
Run migrations with:  

```bash
npm run migrate
```

This project uses `knex` with a connection pool configured in `src/db/knex.ts`, and `objection` models in the `src/models/` directory.  

## Running the Server

Start the server:  

```bash
npm start
```

## API Documentation

The API is documented using OpenAPI 3.1 specification. The specification file is located at `openapi.yml` in the root directory.  

## Dependencies

App dependencies:

- bcrypt: ^6.0.0,
- cors: ^2.8.5,
- dotenv: ^17.2.3,
- express: ^5.2.1,
- jsonwebtoken: ^9.0.3,
- knex: ^2.5.1,
- nodemon: ^3.0.1,
- objection: ^3.1.5,
- pg: ^8.10.0,
- uuid: ^13.0.0,
- ws: ^8.18.3

Development dependencies:

- @types/bcrypt: ^6.0.0,
- @types/cors: ^2.8.19,
- @types/express: ^5.0.6,
- @types/jsonwebtoken: ^9.0.10,
- @types/knex: ^0.15.2,
- @types/node: ^25.0.2,
- @types/pg: ^8.16.0,
- @types/ws: ^8.18.1,
- eslint: ^9.39.1,
- prettier: ^3.7.4,
- ts-node: ^10.9.2,
- typescript: ^5.9.3
