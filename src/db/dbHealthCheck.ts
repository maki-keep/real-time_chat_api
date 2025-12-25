import type { Request, Response, NextFunction } from 'express';
import { knex } from './knex.js';

const dbHealthCheck = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // health check if database is reachable
    await knex
      .raw('SELECT 1+1 AS result')
      .timeout(1000);

    next();
  } catch {
    res
      .status(503)
      .json({ error: 'Database unreachable' });
  }
};

export default dbHealthCheck;
