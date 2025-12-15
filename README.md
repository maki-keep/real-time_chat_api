# real-time_chat_api
 Real-Time Chat API.

Database & setup
-----------------

 - Copy `.env.example` to `.env` and set your database credentials.
 - Run migrations with:

```bash
npm install
npm run migrate
```

 - Start server:

```bash
npm start
```

This project uses `knex` with a connection pool configured in `db/knex.js`, and `objection` models in the `models/` directory.

