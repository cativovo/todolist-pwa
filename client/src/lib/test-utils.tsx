import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AnyContext,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
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
			}
		}
	});
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function createTestRouter(component: FC) {
  const rootRoute = createRootRoute({
    component: Outlet,
  });
  const componentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component,
  });

  return createRouter({
    routeTree: rootRoute.addChildren([componentRoute]),
    history: createMemoryHistory(),
    Wrap: AllProviders,
  });
}

async function customRender(
  ui: FC,
  context?: AnyContext,
  options?: RenderOptions,
) {
  const router: any = createTestRouter(ui);
  return await act(async () =>
    render(<RouterProvider router={router} context={context} />, options),
  );
}

export * from "@testing-library/react";

export { customRender as render };
