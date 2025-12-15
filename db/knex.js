const knex = require('knex');
const { Model } = require('objection');
const path = require('path');
require('dotenv').config();

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'chatdb'
  },
  pool: {
    min: Number(process.env.DB_POOL_MIN || 2),
    max: Number(process.env.DB_POOL_MAX || 10),
    acquireTimeoutMillis: 30000
  },
  migrations: {
    directory: path.join(__dirname, 'migrations')
  }
};

const knexInstance = knex(config);

// Bind Objection Model to knex instance so models can use it
Model.knex(knexInstance);

module.exports = { knex: knexInstance, Model };
