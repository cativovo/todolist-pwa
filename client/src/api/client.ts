import { router } from "@/router";
import ky from "ky";

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_BFF,
  credentials: "include",
  hooks: {
    afterResponse: [
      async (_input, _options, response) => {
        if (response.status === 401 && !response.url.includes("/auth/me")) {
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
