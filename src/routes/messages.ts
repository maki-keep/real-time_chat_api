import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import type { UUID } from 'node:crypto';

import Conversation from '../models/Conversation.js';
import queryOptions from './queryOptions.js';
import Message from '../models/Message.js';
import requireRequestBodyProperty from '../middleware/requireRequestBodyProperty.js';
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
    const list = await Message.listByConversation(req.params.conversationId as UUID, options);
    return res.json(list);
  } catch {
    return res.status(500).send();
  }
});

router.post('/', requireRequestBodyProperty('content'), async (req: Request, res: Response) => {
  if (!req.user || !req.user.sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const created = await Message.createMessage(req.user.sub as UUID, req.body.content, req.params.conversationId as UUID, req.body.metadata || {});
    return res.status(201).json(created);
  } catch {
    return res.status(500).send();
  }
});

router.use('/:messageId', requireParam('messageId'), requireParamUUID('messageId'));

router.get('/:messageId', async (req: Request, res: Response) => {
  try {
    const message = await Message.getById(req.params.messageId as UUID);
    if (!message) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.json(message);
  } catch {
    return res.status(500).send();
  }
});

router.patch('/:messageId', async (req: Request, res: Response) => {
  try {
    const updated = await Message.updateById(req.params.messageId as UUID, req.body);
    return res.json(updated);
  } catch {
    return res.status(500).send();
  }
});

router.delete('/:messageId', async (req: Request, res: Response) => {
  try {
    await Message.deleteById(req.params.messageId as UUID);
    return res.status(204).end();
  } catch {
    return res.status(500).send();
  }
});

export default router;
