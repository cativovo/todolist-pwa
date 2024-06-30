import { me } from "@/api/auth";
import PWABadge from "@/components/PWABadge";
import "@/index.css";
import { User } from "@/schema/user";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: User | null;
}>()({
  component: Root,
  async beforeLoad() {
    try {
      const user = await me();

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
      <PWABadge />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
