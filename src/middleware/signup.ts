import type { Request, Response } from 'express';

import User from '../models/User.js';
import { hash } from '../utils/passwordHash.js';
import signToken from '../utils/jwt.js';

/**
 * Creates a new user and signs a JWT containing the new user payload.
 */
const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      // user conflict (409)
      return res.status(409).json({ error: 'User already exists' });
    }

    // hash the password
    const passwordHash = await hash(password);

    // create a new user
    const newUser = await User.createUser(username, passwordHash);

    // sign JWT
    const token = signToken(newUser.id, newUser.username);

    return res.status(201).json({ token });
  } catch {
    return res.status(500).json({ error: 'Error on signup' });
  }
};

export default signup;
