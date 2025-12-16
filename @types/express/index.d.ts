import type { JwtPayload } from 'jsonwebtoken';
import 'express';

declare module 'express' {
  interface Request {
    /**
     * Authenticated user payload.
     */
    user?: JwtPayload;
  }
}

export {};
