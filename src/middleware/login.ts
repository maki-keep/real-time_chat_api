import type { Request, Response } from 'express';
import findUsername from '../queries/findByUsername.ts';
import { validate } from '../utils/passwordHash.ts';
import signToken from '../utils/jwt.ts';

/**
 * Signs a JWT containing the user payload.
 */
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  const userRecord = await findUsername(username);
  if (!userRecord) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    // validate password
    const validPassword = await validate(password, userRecord.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
  
    // sign JWT
    const token = signToken(userRecord.id, userRecord.username);

    return res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error on login' });
  }
};

export default login;
