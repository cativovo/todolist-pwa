import { UpdateTodoForm } from "@/components/forms";
import { findTodoByIdQueryOptions, useFindTodoById } from "@/hooks/todos";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/todos/update/$id")({
  component: UpdateTodoRoute,
  loader({ context, params }) {
    return context.queryClient.ensureQueryData(
      findTodoByIdQueryOptions(params.id),
    );
  },
});

function UpdateTodoRoute(): JSX.Element {
  const navigate = useNavigate();
  const params = Route.useParams();
  const query = useFindTodoById(params.id);

  function back() {
    navigate({
      to: "/todos",
    });
  }

  return (
    <div className="mx-auto mt-6 max-w-3xl">
      <h1 className="mb-2 scroll-m-20 text-center text-3xl font-extrabold tracking-tight">
        Update ToDo
      </h1>
      <UpdateTodoForm
        onSubmit={back}
        onCancel={back}
        defaultValues={query.data}
      />
    </div>
  );
}
