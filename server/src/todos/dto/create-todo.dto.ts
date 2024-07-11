import { Todo } from 'src/drizzle/schema/todo';
import { z } from 'zod';

export const CreateTodoDto = Todo.pick({
  title: true,
  description: true,
});
export type CreateTodoDto = z.infer<typeof CreateTodoDto>;
