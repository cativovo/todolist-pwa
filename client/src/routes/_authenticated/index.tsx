import TodoStatus from "@/components/todo-status";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { findTodosQueryOptions, useAddTodo, useFindTodos } from "@/hooks/todos";
import { cn } from "@/lib/utils";
import { StatusTodo } from "@/schema/todo";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { SyntheticEvent } from "react";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/")({
  validateSearch: z.object({
    page: z.number().optional().catch(1),
  }),
  loader(match) {
    match.context.queryClient.ensureQueryData(
      findTodosQueryOptions(match.location.search),
    );
  },
  component: IndexPage,
  pendingComponent: () => <h1>loading...</h1>,
});

function IndexPage(): JSX.Element {
  const searchParams = Route.useSearch();
  const query = useFindTodos(searchParams);
  const mutation = useAddTodo();
  const { page = 1 } = searchParams;

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };

    const title = target.title.value;
    const description = target.description.value;
    mutation.mutate({ title, description });
  }

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
  todos = todos.slice(
    0,
    mutation.isPending && isFirstPage ? todos.length - 1 : undefined,
  ); // don't show last element if pending and page 1
  const shouldShowList =
    todos.length > 0 || mutation.isPending || query.isLoading;

  const { startPage, endPage, pages } = getPages(page, totalPages);

  return (
    <div>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" />
        <input name="description" />
        <button type="submit">submit</button>
      </form>
      {shouldShowList && (
        <div className="relative mx-auto max-w-xl">
          {query.isRefetching && (!mutation.isPending || !isFirstPage) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-35">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
          <ul className="divide-y rounded-sm border">
            {isFirstPage && mutation.isPending && (
              <li className="flex items-center gap-2 bg-gray-200 p-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="truncate">{mutation.variables.title}</span>
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
                <Link to="/todo/$id" params={{ id: todo.id }}>
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
