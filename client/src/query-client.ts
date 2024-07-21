import { QueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { toast } from "sonner";

export const queryClient = new QueryClient({
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
