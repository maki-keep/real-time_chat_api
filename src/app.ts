import express from 'express';
import type { Request, Response } from 'express';

import { authenticate } from './middleware/auth.ts';

const app = express();
app.use(express.json());

// require JWT for all routes
app.use(authenticate);

app.get('/', (req: Request, res: Response) => res.json({ status: 'ok' }));

export default app;
