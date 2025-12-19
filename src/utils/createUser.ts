import User from '../models/User.ts';

/**
 * Creates a new user in the database.
 */
const createUser = async (username: string, passwordHash: string, additionalData?: { avatar_url?: string; bio?: string; display_name?: string }) => {
  try {
    const newUser = await User.createUser(username, passwordHash, additionalData);
    return newUser;
  } catch (error) {
    throw new Error(`Failed to create user: ${(error as Error).message}`);
  }
};

export default createUser;
