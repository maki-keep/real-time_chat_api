import dotenv from 'dotenv';

dotenv.config();

export default {
  BASE_URL: process.env.BASE_URL || 'http://localhost',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_NAME: process.env.DB_NAME || 'chatdb',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_POOL_MAX: Number(process.env.DB_POOL_MAX || 10),
  DB_POOL_MIN: Number(process.env.DB_POOL_MIN || 2),
  DB_PORT: Number(process.env.DB_PORT || 5432),
  DB_USER: process.env.DB_USER || 'postgres',
  JWT_OPTIONS_ISSUER: process.env.JWT_OPTIONS_ISSUER || 'real-time_chat_api',
  JWT_SECRET: process.env.JWT_SECRET || 'replace-me',
  PORT: Number(process.env.PORT || 3000),
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS || 19),
  SERVER_UPGRADE_PATH: process.env.SERVER_UPGRADE_PATH || '/realtime/connect'
};
