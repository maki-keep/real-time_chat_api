import express from 'express';
import type { Request, Response } from 'express';

import login from './middleware/login.ts';
import signup from './middleware/signup.ts';

import { authenticate } from './middleware/auth.ts';

const app = express();
app.use(express.json());

// sign JWT before authentication
app.post('/login', login);
app.post('/signup', signup);

// require JWT for all routes after login
app.use(authenticate);

app.get('/', (req: Request, res: Response) => res.json({ status: 'ok' }));

export default app;
