import 'jsonwebtoken';

declare module 'jsonwebtoken' {
  interface JwtPayload {
    /**
     * The authenticated username.
     */
    username?: string;
  }
}

export {};
