import { z } from 'zod';
import { CreateTodoDto } from './create-todo.dto';

export const UpdateTodoDto = CreateTodoDto.partial();
export type UpdateTodoDto = z.infer<typeof UpdateTodoDto>;
