import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { Todo, todos } from 'src/drizzle/schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

type FindAllOptions = {
  limit: number;
  offset: number;
};

type FindAllResult = {
  total: number;
  todos: Pick<Todo, 'id' | 'title' | 'status'>[];
}[];

@Injectable()
export class TodosService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(userId: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    const result = await this.drizzleService.db
      .insert(todos)
      .values({
        ...createTodoDto,
        userId,
      })
      .returning();

    return result[0];
  }

  async findAll(userId: string, options: FindAllOptions) {
    const result: FindAllResult = await this.drizzleService.db.execute(
      sql`
				SELECT (
						SELECT
							COUNT(id)
						FROM 
							${todos} 
						WHERE ${todos.userId} = ${userId}
					) AS total,
					(
						SELECT 
							JSON_AGG(rows.*) 
						FROM (
							SELECT 
								${todos.id}, ${todos.title}, ${todos.status}
							FROM 
								todos 
							WHERE ${todos.userId} = ${userId} 
							ORDER BY ${todos.updatedAt} DESC
							OFFSET ${options.offset}
							LIMIT ${options.limit}
						) AS ROWS
					) AS TODOS`,
    );

    const v = result[0];

    return {
      todos: v?.todos ?? [],
      total: v?.total ?? 0,
    };
  }

  async findOne(userId: string, id: string): Promise<Todo | null> {
    const result = await this.drizzleService.db
      .select()
      .from(todos)
      .where(sql`${todos.userId} = ${userId} and ${todos.id} = ${id}`);

    const todo = result[0];

    if (!todo) {
      return null;
    }

    return todo;
  }

  async update(
    userId: string,
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | null> {
    const result = await this.drizzleService.db
      .update(todos)
      .set({
        ...updateTodoDto,
        updatedAt: new Date(),
      })
      .where(and(eq(todos.userId, userId), eq(todos.id, id)))
      .returning();

    return result[0] ?? null;
  }

  async remove(userId: string, id: string): Promise<void> {
    await this.drizzleService.db
      .delete(todos)
      .where(and(eq(todos.userId, userId), eq(todos.id, id)));
  }
}
