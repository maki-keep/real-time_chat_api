import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import type { UUID } from 'node:crypto';

import Conversation from '../models/Conversation.js';
import queryOptions from './queryOptions.js';
import Member from '../models/Member.js';
import requireRequestBodyProperty from '../middleware/requireRequestBodyProperty.js';
import requireRBPUUID from '../middleware/requireRBPUUID.js';
import requireParam from '../middleware/requireParam.js';
import requireParamUUID from '../middleware/requireParamUUID.js';

const router = express.Router({ mergeParams: true });

router.use('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversation = await Conversation.getById(req.params.conversationId as UUID);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    next();
  } catch {
    return res.status(500).send();
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const options = queryOptions(req);
    const list = await Member.listByParameter('conversation_id', req.params.conversationId as UUID, options);
    return res.json(list);
  } catch {
    return res.status(500).send();
  }
});

router.post('/', requireRequestBodyProperty('userId'), requireRBPUUID('userId'), async (req: Request, res: Response) => {
  try {
    const added = await Member.addMember(req.params.conversationId as UUID, req.body.userId as UUID);
    return res.status(201).json(added);
  } catch {
    return res.status(500).send();
  }
});

router.use('/:memberId', requireParam('memberId'), requireParamUUID('memberId'));

router.delete('/:memberId', async (req: Request, res: Response) => {
  try {
    await Member.removeMember(req.params.conversationId as UUID, req.params.memberId as UUID);
    return res.status(204).end();
  } catch {
    return res.status(500).send();
  }
});

export default router;
