import User from '../models/User.ts';

/**
 * Finds a user by username in the database.
 */
const findByUsername = async (username: string) => {
  try {
    const user = await User.findByUsername(username);
    return user;
  } catch (error) {
    throw new Error(`Failed to find user: ${(error as Error).message}`);
  }
};

export default findByUsername;
