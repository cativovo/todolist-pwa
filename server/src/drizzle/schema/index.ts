import { todos } from './todo';
import { users } from './user';

export * from './todo';
export * from './user';

const schema = {
  users,
  todos,
};

export default schema;
