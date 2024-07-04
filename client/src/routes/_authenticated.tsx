import { logout } from "@/api/auth";
import { setUser } from "@/lib/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
  beforeLoad({ context }) {
    if (!context.user) {
      context.queryClient.clear();
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
});

function Authenticated() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: logout,
    async onSettled() {
      setUser(null);
      queryClient.clear();
      await router.invalidate();
    },
  });
  const context = Route.useRouteContext();
  const user = context.user!;

  function handleLogout() {
    mutation.mutate();
  }

  return (
    <>
      <h1>{user.username}</h1>
      <button onClick={handleLogout}>logout</button>
      <Outlet />
    </>
  );
}
