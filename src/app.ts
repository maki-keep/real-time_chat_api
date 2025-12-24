import express from 'express';
import type { Request, Response } from 'express';

import dbHealthCheck from './db/dbHealthCheck.ts';

import login from './middleware/login.ts';
import signup from './middleware/signup.ts';

import { authenticate } from './middleware/auth.ts';

const app = express();
app.use(express.json());

app.use('/', dbHealthCheck);

// sign JWT before authentication
app.post('/login', login);
app.post('/signup', signup);

// require JWT for all routes after login
app.use(authenticate);

app.get('/', (_req: Request, res: Response) => res.json({ status: 'ok' }));

export default app;
