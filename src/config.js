const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  BASE_URL: process.env.BASE_URL || 'http://localhost',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'replace-me',
};
