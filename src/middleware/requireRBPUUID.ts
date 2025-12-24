import type { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

const requireRBPUUID =
  (property: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body && req.body[property] && !validate(req.body[property])) {
      return res.status(400).json({ error: `Invalid ${property} in request body, must be a UUID` });
    }
    next();
  };

export default requireRBPUUID;
