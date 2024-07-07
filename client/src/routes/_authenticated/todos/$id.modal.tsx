import { Todo } from "@/components/todo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { findTodoByIdQueryOptions } from "@/hooks/todos";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/todos/$id/modal")({
  component: TodoModalRoute,
  loader({ context, params }) {
    return context.queryClient.ensureQueryData(
      findTodoByIdQueryOptions(params.id),
    );
  },
});

function TodoModalRoute() {
  const router = useRouter();
  const params = Route.useParams();

  function handleClose() {
    router.history.back();
  }

  return (
    <Dialog defaultOpen onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>ToDo</DialogTitle>
          <DialogDescription className="sr-only">Your ToDo</DialogDescription>
        </DialogHeader>
        <div className="min-h-96">
          <Todo id={params.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
