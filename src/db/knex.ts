import { fileURLToPath } from 'node:url';
import {
  dirname,
  join
} from 'node:path';
import type { Knex } from 'knex';
import config from '../config.ts';
import knex from 'knex';
import { Model } from 'objection';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
  },
  pool: {
    min: config.DB_POOL_MIN,
    max: config.DB_POOL_MAX,
    acquireTimeoutMillis: 30000
  },
  migrations: {
    directory: join(__dirname, 'migrations')
  }
};

const knexInstance = knex.knex(knexConfig);

// Bind Objection Model to knex instance so models can use it
Model.knex(knexInstance);

export {
  knexInstance as knex,
  Model
};
