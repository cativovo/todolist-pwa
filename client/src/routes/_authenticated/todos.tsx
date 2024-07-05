import TodoStatus from "@/components/todo-status";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  findTodosQueryOptions,
  useCreateTodoVariables,
  useFindTodos,
} from "@/hooks/todos";
import { cn } from "@/lib/utils";
import { StatusTodo } from "@/schema/todo";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/todos")({
  validateSearch: z.object({
    page: z.number().optional().catch(1),
  }),
  loader(match) {
    match.context.queryClient.ensureQueryData(
      findTodosQueryOptions(match.location.search),
    );
  },
  component: TodosRoute,
  pendingComponent: () => <h1>loading...</h1>,
});

function TodosRoute(): JSX.Element {
  const searchParams = Route.useSearch();
  const query = useFindTodos(searchParams);
  const createTodoVariables = useCreateTodoVariables();
  const { page = 1 } = searchParams;

  if (query.isError) {
    return (
      <>
        <p>something went wrong</p>
        <button onClick={() => query.refetch()}>retry</button>
      </>
    );
  }

  const isFirstPage = page === 1;
  const totalPages = query.data?.pages ?? 0;
  let todos = query.data?.todos ?? [];
  // don't show last element of todos if create todo mutation is pending and page 1
  todos = todos.slice(
    0,
    createTodoVariables && isFirstPage ? todos.length - 1 : undefined,
  );
  const shouldShowList = todos.length > 0 || query.isLoading;

  const { startPage, endPage, pages } = getPages(page, totalPages);

  return (
    <>
      <div className="mx-auto flex max-w-xl flex-col gap-2">
        <h1>ToDo list</h1>
        <Link
          to="/todos/create-todo/modal"
          mask={{ to: "/todos/create-todo" }}
          className="ml-auto text-primary underline-offset-4 hover:underline"
        >
          Create ToDo
        </Link>
        {shouldShowList && (
          <div className="relative">
            {query.isRefetching && (!createTodoVariables || !isFirstPage) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-35">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
            <ul className="divide-y rounded-sm border">
              {!query.isLoading && isFirstPage && createTodoVariables && (
                <li className="flex items-center gap-2 bg-gray-200 p-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="truncate">{createTodoVariables.title}</span>
                  <TodoStatus status={StatusTodo.Todo} className="ml-auto" />
                </li>
              )}

              {query.isLoading &&
                Array.from({ length: 10 }, (_, i) => (
                  <li key={i} className="px-2 py-3">
                    <Skeleton className="rounded-sm">&nbsp;</Skeleton>
                  </li>
                ))}

              {todos.map((todo) => (
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
        )}
        {!query.isLoading && (
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
                <PaginationLink
                  key={v}
                  search={{ page: v }}
                  isActive={v === page}
                >
                  {v}
                </PaginationLink>
              ))}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <PaginationEllipsis />}
                  <PaginationLink
                    search={{ page: totalPages }}
                    isActive={page === totalPages}
                  >
                    {totalPages}
                  </PaginationLink>
                </>
              )}
              <PaginationNext
                search={{ page: page + 1 }}
                disabled={page === totalPages}
                className={cn(
                  page === totalPages && "cursor-not-allowed text-gray-300",
                )}
              />
            </PaginationContent>
          </Pagination>
        )}
      </div>
      <Outlet />
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
