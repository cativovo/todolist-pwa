import { useMutation } from "@tanstack/react-query";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { logout } from "../api/auth";

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
  beforeLoad({ context }) {
    if (!context.user) {
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
});

function Authenticated() {
  const mutation = useMutation({
    mutationFn: logout,
    onSettled() {
      window.location.href = "/login";
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
