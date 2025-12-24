import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import config from '../config.ts';

const {
  JWT_SECRET,
  JWT_OPTIONS_ISSUER
} = config;

const signToken = (sub: string, username: string): string => {
  if (!sub || !username) {
    throw new Error('Invalid claims');
  }
  const claims: JwtPayload = { sub, username };
  return jwt.sign(
    claims,
    JWT_SECRET,
    {
      issuer: JWT_OPTIONS_ISSUER,
      audience: JWT_OPTIONS_ISSUER,
      expiresIn: '1h',
    }
  );
};

export default signToken;
