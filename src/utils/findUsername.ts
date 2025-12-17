import usersStore from '../stores/usersStore.ts';

/**
 * Finds a user by username in the store.
 */
const findUsername = (username: string) => {
  return usersStore.items.find(u => u.username === username);
};

export default findUsername;
