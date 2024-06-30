import { z } from 'zod';
import { Todo } from '../schemas/todo';

export const CreateTodoDto = Todo.pick({
  title: true,
  description: true,
});
export type CreateTodoDto = z.infer<typeof CreateTodoDto>;
