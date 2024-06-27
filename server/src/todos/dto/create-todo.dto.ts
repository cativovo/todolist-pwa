import { z } from 'zod';
import { Todo } from '../todos.service';

export const CreateTodoDto = Todo.pick({
  title: true,
  description: true,
});
export type CreateTodoDto = z.infer<typeof CreateTodoDto>;
