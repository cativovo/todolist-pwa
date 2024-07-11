import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './user';

export const statusEnum = pgEnum('status', [
  'todo',
  'inprogress',
  'done',
  'cancelled',
]);

export const StatusTodo = z.enum(statusEnum.enumValues);
export type StatusTodo = z.infer<typeof StatusTodo>;

export const todos = pgTable('todos', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: statusEnum('status').notNull().default('todo'),
  // TODO: mali ata yung time, need i-fix
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const Todo = createSelectSchema(todos);
export type Todo = z.infer<typeof Todo>;
