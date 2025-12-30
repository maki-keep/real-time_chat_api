import cors from 'cors';
import type { CorsOptions } from 'cors';

import config from './config.js';

const {
  ORIGIN
} = config;

const corsOptions: CorsOptions = {
  allowedHeaders: [
    'Accept',
    'Authorization',
    'Content-Type',
  ],
  credentials: true,
  maxAge: 86400, // 24 hours
  methods: [
    'GET',
    'POST',
    'PATCH',
    'PUT',
    'DELETE',
    'OPTIONS'
  ],
  origin: ORIGIN
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
