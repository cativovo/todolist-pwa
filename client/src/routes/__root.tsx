import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import PWABadge from "../components/PWABadge";
import "../index.css";
import { User } from "../schema/user";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: User | null;
}>()({
  component: Root,
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
