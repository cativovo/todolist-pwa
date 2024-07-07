import TodosStatusSkeleton from "../status/todo-status-skeleton";
import { Skeleton } from "../ui/skeleton";

export function TodoSkeleton() {
  return (
    <div className="flex divide-x">
      <div className="flex-1 space-y-1 px-2">
        <Skeleton className="mx-auto h-8 w-40" />
        <Skeleton>&nbsp;</Skeleton>
        <Skeleton className="inline-block h-7 w-40">&nbsp;</Skeleton>
        <Skeleton>&nbsp;</Skeleton>
        <Skeleton>&nbsp;</Skeleton>
        <Skeleton>&nbsp;</Skeleton>
        <Skeleton>&nbsp;</Skeleton>
      </div>
      <div className="basis-1/3 space-y-1 px-2 text-right">
        <TodosStatusSkeleton />
        <Skeleton>&nbsp;</Skeleton>
        <Skeleton>&nbsp;</Skeleton>
      </div>
    </div>
  );
}
