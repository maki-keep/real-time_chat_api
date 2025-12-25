import express from 'express';
import type { Request, Response } from 'express';

import dbHealthCheck from './db/dbHealthCheck.js';
import requireRequestBody from './middleware/requireRequestBody.js';

import login from './middleware/login.js';
import signup from './middleware/signup.js';

import { authenticate } from './middleware/auth.js';

import usersRouter from './routes/users.js';
import conversationsRouter from './routes/conversations.js';

const app = express();
app.use(express.json());

app.use('/', dbHealthCheck);
app.post('/', requireRequestBody);

// sign JWT before authentication
app.post('/login', login);
app.post('/signup', signup);

// require JWT for all routes after login
app.use(authenticate);

app.patch('/', requireRequestBody);
app.use('/users', usersRouter);
app.use('/conversations', conversationsRouter);

app.get('/', (_req: Request, res: Response) => res.json({ status: 'ok' }));

export default app;
