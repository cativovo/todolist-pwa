import { useFindTodos } from "@/hooks/todos";
import { cn } from "@/lib/utils";
import { Link, useSearch } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import TodoStatus from "../todo-status";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { TodoListSkeleton } from "./list-skeleton";

export function ToDoList() {
  const searchParams = useSearch({ from: "/_authenticated/todos" });
  const { data, isRefetching, error } = useFindTodos(searchParams);
  const { page = 1 } = searchParams;

  if (error) {
    return <p>ooops something went wrong</p>;
  }

  if (!data) {
    return <TodoListSkeleton />;
  }

  const { startPage, endPage, pages } = getPages(page, data.pages);

  return (
    <>
      <div className="relative">
        {isRefetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-35">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        <ul className="divide-y rounded-sm border">
          {data.todos.map((todo) => (
            <li key={todo.id}>
              <Link to="/todos/$id" params={{ id: todo.id }}>
                <div className="flex items-center gap-2 p-2 transition-colors hover:bg-gray-100">
                  <span className="truncate">{todo.title}</span>
                  <TodoStatus status={todo.status} className="ml-auto" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationPrevious
            search={{ page: page - 1 }}
            disabled={page === 1}
            className={cn(page === 1 && "cursor-not-allowed text-gray-300")}
          />
          {startPage > 1 && (
            <>
              <PaginationLink search={{ page: 1 }} isActive={page === 1}>
                1
              </PaginationLink>
              {startPage > 2 && <PaginationEllipsis />}
            </>
          )}

          {pages.map((v) => (
            <PaginationLink key={v} search={{ page: v }} isActive={v === page}>
              {v}
            </PaginationLink>
          ))}
          {endPage < data.pages && (
            <>
              {endPage < data.pages - 1 && <PaginationEllipsis />}
              <PaginationLink
                search={{ page: data.pages }}
                isActive={page === data.pages}
              >
                {data.pages}
              </PaginationLink>
            </>
          )}
          <PaginationNext
            search={{ page: page + 1 }}
            disabled={page === data.pages}
            className={cn(
              page === data.pages && "cursor-not-allowed text-gray-300",
            )}
          />
        </PaginationContent>
      </Pagination>
    </>
  );
}

function getPages(current: number, totalPages: number) {
  const pages = [];
  const maxPages = 5;
  const halfMaxPages = Math.ceil(maxPages / 2);

  let startPage = Math.max(1, current - halfMaxPages);
  let endPage = Math.min(totalPages, current + halfMaxPages);

  if (startPage <= 2) {
    endPage = Math.min(totalPages, startPage + maxPages - 1);
    startPage = 1;
  }

  if (endPage >= totalPages - 1) {
    startPage = Math.max(1, totalPages - maxPages + 1);
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return {
    startPage,
    endPage,
    pages,
  };
}
