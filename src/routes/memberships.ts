import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import type { UUID } from 'node:crypto';

import User from '../models/User.js';
import queryOptions from './queryOptions.js';
import Member from '../models/Member.js';

const router = express.Router({ mergeParams: true });

router.use('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.getById(req.params.userId as UUID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    next();
  } catch {
    return res.status(500).send();
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const options = queryOptions(req);
    const list = await Member.listByParameter('user_id', req.params.userId as UUID, options);
    return res.json(list);
  } catch {
    return res.status(500).send();
  }
});

export default router;
