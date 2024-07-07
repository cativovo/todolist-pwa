import {
  createTodo,
  findTodoById,
  findTodos,
  FindTodosSearchParams,
  updateTodo,
} from "@/api/todos";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

const findTodosKeys = ["findTodos"];
const createTodoKeys = ["createTodo"];
const updateTodoKeys = ["updateTodo"];

export function findTodosQueryOptions(searchParams: FindTodosSearchParams) {
  return {
    queryKey: [...findTodosKeys, searchParams],
    async queryFn() {
      return await findTodos(searchParams);
    },
    placeholderData: keepPreviousData,
  };
}

export function useFindTodos(searchParams: FindTodosSearchParams) {
  return useQuery(findTodosQueryOptions(searchParams));
}

export function findTodoByIdQueryOptions(id: string) {
  return {
    queryKey: ["findTodoById", id],
    async queryFn() {
      return await findTodoById(id);
    },
  };
}

export function useFindTodoById(id: string) {
  return useSuspenseQuery(findTodoByIdQueryOptions(id));
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: createTodoKeys,
    mutationFn: createTodo,
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: findTodosKeys,
      });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: updateTodoKeys,
    mutationFn: updateTodo,
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: findTodosKeys,
      });
    },
  });
}
