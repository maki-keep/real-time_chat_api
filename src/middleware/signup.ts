import type { Request, Response } from 'express';
import findUsername from '../queries/findByUsername.ts';
import { hash } from '../utils/passwordHash.ts';
import createUser from '../utils/createUser.ts';
import signToken from '../utils/jwt.ts';

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

  const existingUser = await findUsername(username);
  if (existingUser) {
    // user conflict (409)
    return res.status(409).json({ error: 'User already exists' });
  }

  try {
    // hash the password
    const passwordHash = await hash(password);

    // create a new user
    const newUser = await createUser(passwordHash, username);

    // sign JWT
    const token = signToken(newUser.id, newUser.username);

    return res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error on signup' });
  }
};

export default signup;
