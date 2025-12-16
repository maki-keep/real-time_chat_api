import type { JwtPayload } from 'jsonwebtoken';
import 'ws';

declare module 'ws' {
  interface WebSocket {
    /**
     * Authenticated user payload.
     */
    user?: JwtPayload;
  }
}

export {};
