import { me } from "@/api/auth";
import PWABadge from "@/components/PWABadge";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";
import { getUser, setUser } from "@/lib/user";
import { User } from "@/schema/user";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "nprogress/nprogress.css";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: User | null;
}>()({
  component: Root,
  async beforeLoad() {
    const user = getUser();

    if (user) {
      return {
        user,
      };
    }

    try {
      const user = await me();
      setUser(user);
      return {
        user,
      };
    } catch (e) {
      return {
        user: null,
      };
    }
  },
});

function Root(): JSX.Element {
  return (
    <>
      <Outlet />
      <Toaster richColors />
      <PWABadge />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
