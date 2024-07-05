import CreateTodoForm from "@/components/create-todo-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/todos/create-todo/modal")(
  {
    component: CreateTodoModalRoute,
  },
);

function CreateTodoModalRoute(): JSX.Element {
  const router = useRouter();

  function handleClose() {
    router.history.back();
  }

  return (
    <>
      <Dialog defaultOpen onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create ToDo</DialogTitle>
            <DialogDescription className="sr-only">
              Create a new todo. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <CreateTodoForm onSubmit={handleClose} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
