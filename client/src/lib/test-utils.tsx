import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AnyContext,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouteOptions as TanstackRouteOptions,
  RouterProvider,
} from "@tanstack/react-router";
import { act, render, RenderOptions } from "@testing-library/react";
import { FC, ReactNode } from "react";

function AllProviders({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @tanstack/query/stable-query-client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

type RouteOptions = Omit<
  TanstackRouteOptions,
  "getParentRoute" | "path" | "component"
>;

function createTestRouter(component: FC, options?: RouteOptions) {
  const rootRoute = createRootRoute({
    component: Outlet,
  });
  const componentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component,
    ...options,
  });

  return createRouter({
    routeTree: rootRoute.addChildren([componentRoute]),
    history: createMemoryHistory(),
    Wrap: AllProviders,
  });
}

type CustomRenderOptions = {
  renderOptions?: RenderOptions;
  routeOptions?: RouteOptions;
  context?: AnyContext;
};

async function customRender(
  ui: FC,
  { context, renderOptions, routeOptions }: CustomRenderOptions = {},
) {
  const router: any = createTestRouter(ui, routeOptions);
  return await act(async () =>
    render(<RouterProvider router={router} context={context} />, renderOptions),
  );
}

export * from "@testing-library/react";

export { customRender as render };
