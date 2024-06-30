import { Injectable } from '@nestjs/common';
import { getUnixTime } from 'date-fns';
import { nanoid } from 'nanoid';
import sleep from 'src/sleep';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, StatusTodo } from './schemas/todo';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  async create(userId: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    await sleep();
    const now = getUnixTime(new Date());
    const todo: Todo = {
      ...createTodoDto,
      id: nanoid(),
      updatedAt: now,
      createdAt: now,
      userId,
      status: StatusTodo.Todo,
    };
    this.todos.push(todo);

    return todo;
  }

  async findAll(): Promise<Pick<Todo, 'id' | 'title' | 'status'>[]> {
    await sleep();
    return this.todos
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map(({ id, title, status }) => ({ id, title, status }));
  }

  async findOne(userId: string, id: string): Promise<Todo | null> {
    await sleep();
    const todo = this.todos.find((v) => v.id === id && v.userId === userId);

    if (!todo) {
      return null;
    }

    return { ...todo };
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    await sleep();
    const index = this.todos.findIndex((v) => v.id === id);

    if (index < 0) {
      return null;
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
