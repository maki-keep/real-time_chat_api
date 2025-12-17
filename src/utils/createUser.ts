import usersStore from "../stores/usersStore.ts";

/**
 * Creates a new user and adds it to the users store.
 */
const createUser = (passwordHash: string, username: string) => {
  const newUser = {
    id: Date.now().toString(),
    passwordHash,
    username
  };
  usersStore.items.push(newUser);
  return newUser;
};

export default createUser;
