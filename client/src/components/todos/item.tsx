import { useRemoveTodo, useUpdateTodo } from "@/hooks/todos";
import { cn } from "@/lib/utils";
import { StatusTodo, Todo } from "@/schema/todo";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { Link, useNavigate } from "@tanstack/react-router";
import { EllipsisVertical, Loader2 } from "lucide-react";
import { useState } from "react";
import { TodoStatus } from "../status";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TodoItemProps = {
  todo: Todo;
  search: {
    page?: number;
  };
};

export function TodoItem({ todo, search }: TodoItemProps) {
  const navigate = useNavigate();
  const removeMutation = useRemoveTodo(todo.id);
  const updateMutation = useUpdateTodo(todo.id);
  const [open, setOpen] = useState(false);

  function update() {
    navigate({
      to: "/todos/update/$id",
      params: {
        id: todo.id,
      },
      search,
    });
  }

  async function remove() {
    await removeMutation.mutateAsync();
    setOpen(false);
  }

  function updateStatus(status: StatusTodo) {
    updateMutation.mutate({ status });
  }

  const disabled = removeMutation.isPending || removeMutation.isSuccess;
  const addLineThrough =
    todo.status === StatusTodo.Done || todo.status === StatusTodo.Cancelled;

  return (
    <li
      key={todo.id}
      className="flex items-center transition-colors hover:bg-gray-100"
    >
      <Link
        to="/todos/$id/modal"
        mask={{
          to: "/todos/$id",
          params: { id: todo.id },
          search,
        }}
        params={{ id: todo.id }}
        search={search}
        className={cn(
          "flex-1 truncate py-2 pl-2",
          addLineThrough && "line-through",
        )}
      >
        {todo.title}
      </Link>
      <div className="flex items-center px-2">
        <Select defaultValue={todo.status} onValueChange={updateStatus}>
          <SelectTrigger className="p-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(StatusTodo).map((status) => (
              <SelectItem key={status} value={status}>
                <TodoStatus status={status} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog onOpenChange={setOpen} open={open}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem onSelect={update}>
                Update
              </DropdownMenuCheckboxItem>
              <DialogTrigger asChild>
                <DropdownMenuCheckboxItem>Remove</DropdownMenuCheckboxItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
            <DialogFooter>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={remove}
                  disabled={disabled}
                >
                  {disabled && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Confirm
                </Button>
                <DialogClose asChild>
                  <Button disabled={disabled}>Cancel</Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
