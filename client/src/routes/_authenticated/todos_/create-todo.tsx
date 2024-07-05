import CreateTodoForm from "@/components/create-todo-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/todos/create-todo")({
  component: CreateTodoRoute,
});

function CreateTodoRoute(): JSX.Element {
  const navigate = useNavigate();

  function back() {
    navigate({
      to: "/todos",
    });
  }

  return (
    <div className="mx-auto mt-6 max-w-3xl">
      <h1 className="mb-2 scroll-m-20 text-center text-3xl font-extrabold tracking-tight">
        Create ToDo
      </h1>
      <CreateTodoForm onSubmit={back} onCancel={back} />
    </div>
  );
}
