import { Todo } from "@/components/todo";
import { TodoSkeleton } from "@/components/todo/todo-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { findTodoByIdQueryOptions } from "@/hooks/todos";
import { cn } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/todos/$id")({
  component: TodoRoute,
  loader(match) {
    return match.context.queryClient.ensureQueryData(
      findTodoByIdQueryOptions(match.params.id),
    );
  },
  pendingComponent: PendingComponent,
});

function TodoRoute() {
  const params = Route.useParams();

  return (
    <div className="mt-6 px-4">
      <Link
        to="/"
        className={cn(buttonVariants({ variant: "default" }), "ml-auto")}
      >
        Back
      </Link>
      <div className="mx-auto mt-4 max-w-5xl">
        <Todo id={params.id} />
      </div>
    </div>
  );
}

function PendingComponent() {
  return (
    <div className="mt-6 px-4">
      <Skeleton className="ml-auto inline-block h-6 w-24 text-sm" />
      <div className="mx-auto mt-4 max-w-5xl">
        <TodoSkeleton />
      </div>
    </div>
  );
}
