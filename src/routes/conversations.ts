import express from 'express';
import type { Request, Response } from 'express';
import type { UUID } from 'node:crypto';

import queryOptions from './queryOptions.ts';
import Conversation from '../models/Conversation.ts';
import requireRequestBodyProperty from '../middleware/requireRequestBodyProperty.ts';
import requireParam from '../middleware/requireParam.ts';
import requireParamUUID from '../middleware/requireParamUUID.ts';
import requireRBPUUID from '../middleware/requireRBPUUID.ts';
import Member from '../models/Member.ts';
import messagesRouter from '../routes/messages.ts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const options = queryOptions(req);
    const list = await Conversation.list(options);
    return res.json(list);
  } catch {
    return res.status(500).send();
  }
});

router.post('/', requireRequestBodyProperty('title'), async (req: Request, res: Response) => {
  try {
    const created = await Conversation.createConversation(req.body.title, !!req.body.isPrivate || false);
    return res.status(201).json(created);
  } catch {
    return res.status(500).send();
  }
});

router.use('/:conversationId', requireParam('conversationId'), requireParamUUID('conversationId'));

router.get('/:conversationId', async (req: Request, res: Response) => {
  try {
    const found = await Conversation.getById(req.params.conversationId as UUID);
    if (!found) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    return res.json(found);
  } catch {
    return res.status(500).send();
  }
});

router.patch('/:conversationId', async (req: Request, res: Response) => {
  try {
    const updated = await Conversation.updateById(req.params.conversationId as UUID, req.body);
    return res.json(updated);
  } catch {
    return res.status(500).send();
  }
});

router.delete('/:conversationId', async (req: Request, res: Response) => {
  try {
    await Conversation.deleteById(req.params.conversationId as UUID);
    return res.status(204).end();
  } catch {
    return res.status(500).send();
  }
});

router.post('/:conversationId/members', requireRequestBodyProperty('userId'), requireRBPUUID('userId'), async (req: Request, res: Response) => {
  try {
    const added = await Member.addMember(req.params.conversationId as UUID, req.body.userId as UUID);
    return res.status(201).json(added);
  } catch {
    return res.status(500).send();
  }
});

router.use('/:conversationId/members/:memberId', requireParam('memberId'), requireParamUUID('memberId'));

router.delete('/:conversationId/members/:memberId', async (req: Request, res: Response) => {
  try {
    await Member.removeMember(req.params.conversationId as UUID, req.params.memberId as UUID);
    return res.status(204).end();
  } catch {
    return res.status(500).send();
  }
});

router.use('/:conversationId/messages', messagesRouter);

export default router;
