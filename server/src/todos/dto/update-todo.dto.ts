import { z } from 'zod';
import { Todo } from '../schemas/todo';

export const UpdateTodoDto = Todo.pick({
  title: true,
  description: true,
  status: true,
}).partial();
export type UpdateTodoDto = z.infer<typeof UpdateTodoDto>;
