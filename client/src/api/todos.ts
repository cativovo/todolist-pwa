import { z } from "zod";
import { Todo } from "../schema/todo";
import { ApiPath, api } from "./client";

export async function findAllTodos(): Promise<Todo[]> {
  return await api.get(ApiPath.Todos).json();
}

export const CreateTodoPayload = Todo.pick({ title: true, description: true });
export type CreateTodoPayload = z.infer<typeof CreateTodoPayload>;
export async function createTodo(payload: CreateTodoPayload): Promise<Todo> {
  return await api.post(ApiPath.Todos, { json: payload }).json();
}
