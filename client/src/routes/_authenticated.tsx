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
  beforeLoad({ context, location }) {
    if (!context.user) {
      context.queryClient.clear();
      throw redirect({
        to: "/login",
        replace: true,
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }

    return context;
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
