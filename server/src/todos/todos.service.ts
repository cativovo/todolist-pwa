import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { getUnixTime } from 'date-fns';

export const Todo = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
export type Todo = z.infer<typeof Todo>;

function delay(ms = 500): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    await delay();
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
    await delay();
    return this.todos
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map(({ id, title }) => ({ id, title }));
  }

  async findOne(id: string): Promise<Todo | undefined> {
    await delay();
    const todo = this.todos.find((v) => v.id === id);
    return todo;
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | undefined> {
    await delay();
    const index = this.todos.findIndex((v) => v.id === id);

    if (index < 0) {
      return undefined;
    }

    const todo = {
      ...this.todos[index],
      ...updateTodoDto,
      updatedAt: getUnixTime(new Date()),
    };
    debugger;
    this.todos[index] = todo;

    return todo;
  }

  async remove(id: string): Promise<void> {
    await delay();
    this.todos = this.todos.filter((v) => v.id !== id);
  }
}
