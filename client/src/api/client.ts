import ky from "ky";

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_BFF,
  credentials: "include",
});
export enum ApiPath {
  Todos = "todos",
  Auth = "auth",
}
