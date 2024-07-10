import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
});

export const User = createSelectSchema(users);
export type User = z.infer<typeof User>;

export const UserWithoutPassword = User.omit({ password: true });
export type UserWithoutPassword = z.infer<typeof UserWithoutPassword>;

export const InsertUserSchema = createInsertSchema(users).omit({ id: true });
export type InsertUserSchema = z.infer<typeof InsertUserSchema>;
