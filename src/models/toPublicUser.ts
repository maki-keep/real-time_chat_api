import User from './User.ts';

const toPublicUser = (user: User) => {
  // extract password_hash and the rest of user
  const { password_hash, ...safeUser } = user;
  return safeUser;
};

export default toPublicUser;
