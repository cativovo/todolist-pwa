import { http, HttpResponse } from "msw";
import { ApiPath } from "../../src/api/client";

export const authBaseUrl = `${process.env.VITE_BFF}/${ApiPath.Auth}`;

export const authHandlers = [
  http.post(`${authBaseUrl}/login`, () => {
    return HttpResponse.json({
      id: "1",
      username: "johndoe",
    });
  }),
];
