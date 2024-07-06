import { logout } from "@/api/auth";
import { setUser } from "@/lib/user";
import { useMutation } from "@tanstack/react-query";
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
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
});

function Authenticated() {
  const router = useRouter();
  const context = Route.useRouteContext();
  const mutation = useMutation({
    mutationFn: logout,
    async onSettled() {
      setUser(null);
      await router.invalidate();
      context.queryClient.clear();
      context.user = null;
    },
  });

  function handleLogout() {
    mutation.mutate();
  }

  if (!context.user) {
    return <p>logging out...</p>;
  }

  return (
    <>
      <h1>{context.user.username}</h1>
      <button onClick={handleLogout}>logout</button>
      <Outlet />
    </>
  );
}
