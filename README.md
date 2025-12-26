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
