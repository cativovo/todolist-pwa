import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import PWABadge from "../components/PWABadge";
import "../index.css";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: Root,
  },
);

function Root(): JSX.Element {
  return (
    <>
      <Outlet />
      <PWABadge />
      <TanStackRouterDevtools />
    </>
  );
}
