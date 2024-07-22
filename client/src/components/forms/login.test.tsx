import { fireEvent, render, screen } from "@/lib/test-utils";
import "@testing-library/jest-dom/vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest";
import { authBaseUrl, authHandlers } from "../../../mocks/handlers/auth";
import LoginForm from "./login";

const server = setupServer(...authHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("form is rendered correctly", async () => {
  await render(LoginForm);
  const title = await screen.findByRole("heading");
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Login");

  expect(await screen.findByRole("form")).toBeInTheDocument();
  expect(await screen.findByLabelText(/username/i)).toBeInTheDocument();
  expect(await screen.findByLabelText(/password/i)).toBeInTheDocument();
  expect(
    await screen.findByRole("button", { name: /login/i }),
  ).toBeInTheDocument();
  expect(
    await screen.findByRole("link", { name: /sign up/i }),
  ).toBeInTheDocument();
});

test("can login", async () => {
  const beforeLoad = vi.fn();
  await render(LoginForm, {
    routeOptions: {
      beforeLoad,
    },
  });

  const getLoginButton = () => screen.findByRole("button", { name: /login/i });

  fireEvent.change(await screen.findByLabelText(/username/i), {
    target: { value: "johndoe" },
  });
  fireEvent.change(await screen.findByLabelText(/password/i), {
    target: { value: "1234" },
  });
  fireEvent.click(await getLoginButton());
  expect(beforeLoad).toHaveBeenCalledOnce();

  expect(await getLoginButton()).toBeDisabled();
});

test("show invalid credentials error", async () => {
  server.use(
    http.post(`${authBaseUrl}/login`, () => {
      return new HttpResponse(null, { status: 401 });
    }),
  );

  await render(LoginForm);

  const getLoginButton = () => screen.findByRole("button", { name: /login/i });

  fireEvent.change(await screen.findByLabelText(/username/i), {
    target: { value: "johndoe" },
  });
  fireEvent.change(await screen.findByLabelText(/password/i), {
    target: { value: "1234" },
  });
  fireEvent.click(await getLoginButton());

  expect(
    await screen.findByText(/invalid username\/password/i),
  ).toBeInTheDocument();

  expect(await getLoginButton()).toBeEnabled();
});
