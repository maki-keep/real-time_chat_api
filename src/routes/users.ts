import express from 'express';
import type { Request, Response } from 'express';
import type { UUID } from 'node:crypto';

import queryOptions from './queryOptions.js';
import User from '../models/User.js';
import requireParam from '../middleware/requireParam.js';
import requireParamUUID from '../middleware/requireParamUUID.js';
import membershipsRouter from '../routes/memberships.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const options = queryOptions(req);
    const list = await User.list(options);
    return res.json(list);
  } catch {
    return res.status(500).send();
  }
});

router.use('/:userId', requireParam('userId'), requireParamUUID('userId'));

router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const found = await User.getById(req.params.userId as UUID);
    if (!found) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(found);
  } catch {
    return res.status(500).send();
  }
});

router.patch('/:userId', async (req: Request, res: Response) => {
  try {
    const updated = await User.updateById(req.params.userId as UUID, req.body);
    return res.json(updated);
  } catch {
    return res.status(500).send();
  }
});

router.delete('/:userId', async (req: Request, res: Response) => {
  try {
    await User.deleteById(req.params.userId as UUID);
    return res.status(204).end();
  } catch {
    return res.status(500).send();
  }
});

router.use('/:userId/memberships', membershipsRouter);

export default router;
