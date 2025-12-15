import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      /**
       * Authenticated user payload.
       */
      user?: string | JwtPayload;
    }
  }
}

export {};
