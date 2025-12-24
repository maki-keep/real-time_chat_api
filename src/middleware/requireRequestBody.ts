import type { Request, Response, NextFunction } from 'express';

const requireRequestBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body required' });
  }

  next();
};

export default requireRequestBody;
