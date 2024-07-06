import {
  createTodo,
  CreateTodoPayload,
  findTodoById,
  findTodos,
  FindTodosSearchParams,
} from "@/api/todos";
import {
  keepPreviousData,
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

const findTodosKeys = ["findTodos"];
const createTodoKeys = ["addTodo"];

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

export function useCreateTodoVariables() {
  const variables = useMutationState({
    filters: { mutationKey: createTodoKeys, status: "pending" },
    select(mutation) {
      return mutation.state.variables;
    },
  });
  return variables[0] as CreateTodoPayload | undefined;
}

export function findTodoByIdQueryOptions(id: string) {
  return {
    queryKey: ["findTodoById", id],
    async queryFn() {
      return await findTodoById(id);
    },
  };
}

export function useTodo(id: string) {
  return useSuspenseQuery({
    ...findTodoByIdQueryOptions(id),
    refetchOnMount: false,
  });
}
