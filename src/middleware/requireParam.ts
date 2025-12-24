import type { Request, Response, NextFunction } from 'express';

const requireParam =
  (param: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.params[param]) {
      return res.status(400).json({ error: `${param} parameter required` });
    }
    next();
  };

export default requireParam;
