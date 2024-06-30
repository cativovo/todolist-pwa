import { z } from 'zod';

export enum StatusTodo {
  Todo = 'todo',
  InProgress = 'inprogress',
  Done = 'done',
  Cancelled = 'cancelled',
}

export const Todo = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(StatusTodo),
  createdAt: z.number(),
  updatedAt: z.number(),
});
export type Todo = z.infer<typeof Todo>;
