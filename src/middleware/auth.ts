import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config.ts';

const { JWT_SECRET } = config;

const extractTokenFromRequest = (request: Request) => {
  if (request.headers && request.headers.authorization) {
    // Authorization: Bearer <token>
    const parts = request.headers.authorization.split(' ');

    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      return parts[1];
    }
  }

  if (request.query && request.query.token && typeof request.query.token === 'string') {
    return request.query.token;
  }

  return null;
};

const verifyToken = (request: Request) => {
  const token = extractTokenFromRequest(request);
  if (token === null) {
    throw new Error('Missing token');
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded === 'string') {
    throw new Error('Invalid token payload');
  }

  return decoded;
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = verifyToken(req);
    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(401).json({ error: err.message || 'Unauthorized' });
  }
};

export { authenticate, verifyToken };
