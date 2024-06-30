import { logout } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
  async beforeLoad({ context }) {
    if (!context.user) {
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
    onSettled() {
      queryClient.clear();
      router.invalidate();
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
