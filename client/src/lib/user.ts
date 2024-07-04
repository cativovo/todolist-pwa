import { User } from "@/schema/user";

let user: User | null;

export function setUser(u: User | null): User | null {
  user = u;
  return user;
}

export function getUser(): User | null {
  return user;
}
