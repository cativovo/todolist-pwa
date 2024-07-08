import { DefaultError, NotFound } from "@/components/errors";
import { createRouter } from "@tanstack/react-router";
import nProgress from "nprogress";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: DefaultError,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

nProgress.configure({
  showSpinner: false,
});

router.subscribe("onBeforeLoad", () => {
  nProgress.start();
});

router.subscribe("onResolved", () => {
  nProgress.done();
});
