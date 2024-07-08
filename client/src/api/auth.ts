import { User } from "../schema/user";
import { ApiPath, api } from "./client";

type LoginPayload = { username: string; password: string };
export async function login(payload: LoginPayload): Promise<User> {
  return await api.post(`${ApiPath.Auth}/login`, { json: payload }).json();
}

type SignUpPayload = { username: string; password: string };
export async function signup(payload: SignUpPayload): Promise<User> {
  return await api.post(`${ApiPath.Auth}/signup`, { json: payload }).json();
}

export async function me(): Promise<User> {
  return await api.get(`${ApiPath.Auth}/me`).json();
}

export async function logout(): Promise<void> {
  await api.post(`${ApiPath.Auth}/logout`).text();
}
