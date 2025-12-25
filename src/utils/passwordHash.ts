import bcrypt from 'bcrypt';
import config from '../config.js';

const { SALT_ROUNDS } = config;

const hash = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const validate = async (password: string, passwordHash: string) => {
  return await bcrypt.compare(password, passwordHash);
};

export { hash, validate };
