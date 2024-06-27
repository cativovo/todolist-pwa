import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { SyntheticEvent } from "react";
import { login } from "../api/auth";
import { meQueryKey } from "../query-keys";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad({ context }) {
    if (context.user) {
      throw redirect({
        to: "/",
        replace: true,
      });
    }
  },
});

function Login(): JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess(user) {
      queryClient.setQueryData(meQueryKey, () => user);
      router.invalidate();
    },
  });

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username.value;
    const password = target.password.value;

    mutation.mutate({ username, password });
  }

  return (
    <div>
      {mutation.isError && <p>invalid username/password</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <Button type="submit" disabled={mutation.isPending}>
          login
        </Button>
      </form>
    </div>
  );
}
