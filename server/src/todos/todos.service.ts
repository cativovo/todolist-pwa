import { Injectable } from '@nestjs/common';
import { getUnixTime } from 'date-fns';
import { nanoid } from 'nanoid';
import sleep from 'src/sleep';
import { z } from 'zod';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export const Todo = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
export type Todo = z.infer<typeof Todo>;

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    await sleep();
    const now = getUnixTime(new Date());
    const todo: Todo = {
      ...createTodoDto,
      id: nanoid(),
      updatedAt: now,
      createdAt: now,
    };
    this.todos.push(todo);

    return todo;
  }

  async findAll(): Promise<Pick<Todo, 'id' | 'title'>[]> {
    await sleep();
    return this.todos
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map(({ id, title }) => ({ id, title }));
  }

  async findOne(id: string): Promise<Todo | undefined> {
    await sleep();
    const todo = this.todos.find((v) => v.id === id);
    return todo;
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | undefined> {
    await sleep();
    const index = this.todos.findIndex((v) => v.id === id);

    if (index < 0) {
      return undefined;
    }

    const todo = {
      ...this.todos[index],
      ...updateTodoDto,
      updatedAt: getUnixTime(new Date()),
    };
    this.todos[index] = todo;

    return todo;
  }

  async remove(id: string): Promise<void> {
    await sleep();
    this.todos = this.todos.filter((v) => v.id !== id);
  }
}
