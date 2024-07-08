import { z } from "zod";
import { Todo } from "../schema/todo";
import { ApiPath, api } from "./client";

export type FindTodosResult = {
  todos: Todo[];
  pages: number;
};
export type FindTodosSearchParams = {
  page?: number;
};
export async function findTodos(
  params: FindTodosSearchParams,
): Promise<FindTodosResult> {
  return await api.get(ApiPath.Todos, { searchParams: params }).json();
}

export async function findTodoById(id: string): Promise<Todo> {
  return await api.get(`${ApiPath.Todos}/${id}`).json();
}

export const CreateTodoPayload = Todo.pick({ title: true, description: true });
export type CreateTodoPayload = z.infer<typeof CreateTodoPayload>;
export async function createTodo(payload: CreateTodoPayload): Promise<Todo> {
  return await api.post(ApiPath.Todos, { json: payload }).json();
}

export const UpdateTodoPayload = Todo.pick({
  title: true,
  description: true,
  status: true,
}).partial();
export type UpdateTodoPayload = z.infer<typeof UpdateTodoPayload>;
export async function updateTodo(
  id: string,
  payload: UpdateTodoPayload,
): Promise<Todo> {
  return await api.patch(`${ApiPath.Todos}/${id}`, { json: payload }).json();
}

export async function removeTodo(id: string): Promise<void> {
  await api.delete(`${ApiPath.Todos}/${id}`);
}
