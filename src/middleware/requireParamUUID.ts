import type { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

const requireUUID =
  (param: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!validate(req.params[param])) {
      return res.status(400).json({ error: `Invalid ${param} parameter, must be a UUID` });
    }
    next();
  };

export default requireUUID;
