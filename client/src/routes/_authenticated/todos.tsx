import { ToDoList } from "@/components/todos";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/todos")({
  validateSearch: z.object({
    page: z.number().optional().catch(1),
  }),
  component: TodosRoute,
});

function TodosRoute() {
  return (
    <>
      <div className="mx-auto flex max-w-xl flex-col gap-2">
        <h1 className="text-center text-2xl">ToDo list</h1>
        <Link
          to="/todos/create/modal"
          mask={{ to: "/todos/create" }}
          className="ml-auto text-primary underline-offset-4 hover:underline"
        >
          Create ToDo
        </Link>
        <ToDoList />
      </div>
      <Outlet />
    </>
  );
}
