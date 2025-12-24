import type { Request, Response, NextFunction } from 'express';

const requireRequestBodyProperty =
  (property: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body && !req.body[property]) {
      return res.status(400).json({ error: `${property} required in request body` });
    }
    next();
  };

export default requireRequestBodyProperty;
