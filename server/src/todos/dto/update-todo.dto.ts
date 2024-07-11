import { Todo } from 'src/drizzle/schema';
import { z } from 'zod';

export const UpdateTodoDto = Todo.pick({
  title: true,
  description: true,
  status: true,
}).partial();
export type UpdateTodoDto = z.infer<typeof UpdateTodoDto>;
