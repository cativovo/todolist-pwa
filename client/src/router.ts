import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import nProgress from "nprogress";

export const router = createRouter({
  routeTree,
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
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
