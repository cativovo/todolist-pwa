import { Injectable } from '@nestjs/common';
import { getUnixTime } from 'date-fns';
import { nanoid } from 'nanoid';
import sleep from 'src/sleep';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, StatusTodo } from './schemas/todo';

type FindAllOptions = {
  limit: number;
  offset: number;
};

type FindAllResult = {
  todos: Pick<Todo, 'id' | 'title' | 'status'>[];
  count: number;
};

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

  async findAll(
    userId: string,
    options: FindAllOptions,
  ): Promise<FindAllResult> {
    await sleep();
    const todos = this.todos
      .filter((todo) => todo.userId === userId)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(options.offset, options.limit + options.offset)
      .map(({ id, title, status }) => ({ id, title, status }));

    return {
      todos,
      count: this.todos.length,
    };
  }

  async findOne(userId: string, id: string): Promise<Todo | null> {
    await sleep();
    const todo = this.todos.find((v) => v.id === id && v.userId === userId);
    console.log(todo, userId, id);

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

  async seed(count: number) {
    const promises = Array.from({ length: count }, async (_, i) => {
      const num = i + 1;
      this.create('1', {
        title: 'title' + num,
        description: 'description' + num,
      });
    });

    await Promise.all(promises);
  }
}
