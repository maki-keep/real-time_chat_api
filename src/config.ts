import dotenv from 'dotenv';

dotenv.config();

export default {
  BASE_URL: process.env.BASE_URL || 'http://localhost',
  JWT_OPTIONS_ISSUER: process.env.JWT_OPTIONS_ISSUER || 'real-time_chat_api',
  JWT_SECRET: process.env.JWT_SECRET || 'replace-me',
  PORT: process.env.PORT || 3000,
  SALT_ROUNDS: process.env.SALT_ROUNDS || 19,
  SERVER_UPGRADE_PATH: process.env.SERVER_UPGRADE_PATH || '/realtime/connect'
};
