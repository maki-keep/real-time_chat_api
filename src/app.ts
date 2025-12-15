import express from 'express';

import { authenticate } from './middleware/auth.ts';

const app = express();
app.use(express.json());

// require JWT for all routes
app.use(authenticate);

app.get('/', (req, res) => res.json({ status: 'ok' }));

export default app;
