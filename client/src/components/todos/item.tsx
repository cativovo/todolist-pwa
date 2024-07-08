import { cn } from "@/lib/utils";
import { StatusTodo, Todo } from "@/schema/todo";
import { Link, useNavigate } from "@tanstack/react-router";
import { EllipsisVertical } from "lucide-react";
import { TodoStatus } from "../status";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type TodoItemProps = {
  todo: Todo;
  search: {
    page?: number;
  };
};

export function TodoItem({ todo, search }: TodoItemProps) {
  const navigate = useNavigate();

  function update() {
    navigate({
      to: "/todos/update/$id",
      params: {
        id: todo.id,
      },
    });
  }

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
          todo.status === StatusTodo.Done && "line-through",
        )}
      >
        {todo.title}
      </Link>
      <div className="flex items-center px-2">
        <TodoStatus status={todo.status} className="ml-auto" />
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
            <DropdownMenuCheckboxItem>Delete</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
