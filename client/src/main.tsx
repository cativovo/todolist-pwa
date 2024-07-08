import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router";
import { toast } from "sonner";
import { HTTPError } from "ky";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error) {
        console.error(error);
        const genericErrorMessage = "Ooops... Something Went Wrong!";

        if (error instanceof HTTPError) {
          if (error.response.status >= 500) {
            toast.error(genericErrorMessage);
          }
          return;
        }

        toast.error(genericErrorMessage);
      },
    },
  },
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ queryClient }} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
