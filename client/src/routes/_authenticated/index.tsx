import { createTodo, findAllTodos } from "@/api/todos";
import { findAllTodosQueryKey } from "@/query-keys";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SyntheticEvent } from "react";

const findAllTodosQueryOptions = {
  queryKey: findAllTodosQueryKey,
  queryFn: findAllTodos,
};

export const Route = createFileRoute("/_authenticated/")({
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
    mutationFn: createTodo,
    onSuccess() {
      context.queryClient.invalidateQueries({ queryKey: findAllTodosQueryKey });
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
        {query.data?.map((todo) => (
          <li key={todo.id}>
            <Link to="/todo/$id" params={{ id: todo.id }}>
              {todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
