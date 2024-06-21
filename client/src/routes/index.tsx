import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { SyntheticEvent } from "react";
import { createTodo, findAllTodos } from "../api/todos";

const findAllTodosKeys = ["findAllTodos"];
const createTodoKeys = ["createTodo"];
const findAllTodosQueryOptions = {
  queryKey: findAllTodosKeys,
  queryFn: findAllTodos,
};

export const Route = createFileRoute("/")({
  loader(match) {
    return match.context.queryClient.ensureQueryData(findAllTodosQueryOptions);
  },
  component: Index,
  pendingComponent: () => <h1>loading...</h1>,
});

function Index(): JSX.Element {
  const context = Route.useRouteContext();
  const query = useSuspenseQuery(findAllTodosQueryOptions);
  const mutation = useMutation({
    mutationKey: createTodoKeys,
    mutationFn: createTodo,
    onSuccess() {
      context.queryClient.invalidateQueries({ queryKey: findAllTodosKeys });
    },
  });

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };

    const title = target.title.value;
    const description = target.description.value;
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
