import { setUser } from "@/lib/user";
import { router } from "@/router";
import ky from "ky";

const ignoredRoutes = ["/auth/me", "/auth/login"];

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_BFF,
  credentials: "include",
  hooks: {
    afterResponse: [
      async (_input, _options, response) => {
        if (
          response.status === 401 &&
          ignoredRoutes.every((url) => !response.url.includes(url))
        ) {
          setUser(null);
          await router.navigate({
            to: "/login",
            replace: true,
            search: {
              redirect: router.latestLocation.href,
            },
          });
        }
      },
    ],
  },
});
export enum ApiPath {
  Todos = "todos",
  Auth = "auth",
}
