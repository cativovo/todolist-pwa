import { createTodo, findTodos, FindTodosSearchParams } from "@/api/todos";
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

const staticQueryKeys = ["findTodos"];

export function findTodosQueryOptions(searchParams: FindTodosSearchParams) {
  return {
    queryKey: [...staticQueryKeys, searchParams],
    async queryFn() {
      return await findTodos(searchParams);
    },
    placeholderData: keepPreviousData,
  };
}

export function useFindTodos(searchParams: FindTodosSearchParams) {
  return useQuery(findTodosQueryOptions(searchParams));
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: staticQueryKeys,
      });
    },
  });
}
