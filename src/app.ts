import express from 'express';
import type { Request, Response } from 'express';

import dbHealthCheck from './db/dbHealthCheck.ts';
import requireRequestBody from './middleware/requireRequestBody.ts';

import login from './middleware/login.ts';
import signup from './middleware/signup.ts';

import { authenticate } from './middleware/auth.ts';

import usersRouter from './routes/users.ts';
import conversationsRouter from './routes/conversations.ts';

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
