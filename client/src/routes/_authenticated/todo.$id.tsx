import { Link, createFileRoute } from "@tanstack/react-router";
import { findTodoById } from "../../api/todos";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";

function findTodoByIdQueryOptions(id: string) {
  return {
    queryKey: ["findTodoById", id],
    queryFn() {
      return findTodoById(id);
    },
  };
}

export const Route = createFileRoute("/_authenticated/todo/$id")({
  component: Todo,
  loader(match) {
    return match.context.queryClient.ensureQueryData(
      findTodoByIdQueryOptions(match.params.id),
    );
  },
  pendingComponent: () => <p>wait lang po...</p>,
});

function Todo(): JSX.Element {
  const params = Route.useParams();
  const query = useSuspenseQuery(findTodoByIdQueryOptions(params.id));

  return (
    <div>
      <button>
        <Link to="/">Home</Link>
      </button>
      <h1>{query.data.title}</h1>
      <p>{query.data.description}</p>
      <p>created at: {formatDate(query.data.createdAt, "PPpp")}</p>
      <p>updated at: {formatDate(query.data.updatedAt, "PPpp")}</p>
    </div>
  );
}
