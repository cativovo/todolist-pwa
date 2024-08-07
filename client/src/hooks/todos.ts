import {
  createTodo,
  findTodoById,
  findTodos,
  FindTodosSearchParams,
  removeTodo,
  updateTodo,
  UpdateTodoPayload,
} from "@/api/todos";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

const findTodosKeys = ["findTodos"];
const createTodoKeys = ["createTodo"];
const updateTodoKeys = ["updateTodo"];
const removeTodoKeys = ["removeTodo"];

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
    onSuccess() {
      toast.success("Todo Added!");
    },
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: findTodosKeys,
      });
    },
  });
}

export function useUpdateTodo(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: updateTodoKeys,
    async mutationFn(payload: UpdateTodoPayload) {
      return await updateTodo(id, payload);
    },
    onSuccess() {
      toast.success("Todo Updated!");
    },
    async onSettled() {
      return await queryClient.invalidateQueries({
        queryKey: findTodosKeys,
      });
    },
  });
}

export function useRemoveTodo(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: removeTodoKeys,
    async mutationFn() {
      return await removeTodo(id);
    },
    onSuccess() {
      toast.success("Todo Removed!");
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: findTodosKeys,
      });
    },
  });
}
