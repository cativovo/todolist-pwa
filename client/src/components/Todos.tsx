import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, findAllTodos } from "../api/todos";
import { SyntheticEvent } from "react";

const findAllTodosKeys = ["findAllTodos"];
const createTodoKeys = ["createTodo"];
export default function Todos() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: createTodoKeys,
    mutationFn: createTodo,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: findAllTodosKeys });
    },
  });
  const query = useQuery({
    queryKey: findAllTodosKeys,
    queryFn: findAllTodos,
  });

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };

    const title = target.title.value;
    const description = target.description.value;
    console.log({ title, description });
    mutation.mutate({ title, description });
  }

  const isInProgress =
    (mutation.isPending || query.isRefetching) && mutation.variables;

  return (
    <div>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" />
        <input name="description" />
        <button type="submit">submit</button>
      </form>
      {query.isPending && <p>loading...</p>}
      {query.isError && (
        <>
          <p>something went wrong</p>
          <button onClick={() => query.refetch()}>retry</button>
        </>
      )}
      <ul>
        {isInProgress && (
          <li style={{ background: "gray" }}>{mutation.variables.title}</li>
        )}
        {query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
}
