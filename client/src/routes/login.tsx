import LoginForm from "@/components/forms/login";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: LoginRoute,
  async beforeLoad({ context, search }) {
    if (context.user) {
      throw redirect({
        to: search.redirect || "/todos",
        replace: true,
      });
    }
  },
});

function LoginRoute(): JSX.Element {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
