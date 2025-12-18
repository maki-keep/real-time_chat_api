import bcrypt from 'bcrypt';
import config from '../config.ts';

const { SALT_ROUNDS } = config;

const hash = async (password: string) => {
  return await bcrypt.hash(password, Number(SALT_ROUNDS));
};

const validate = async (password: string, passwordHash: string) => {
  return await bcrypt.compare(password, passwordHash);
};

export { hash, validate };
