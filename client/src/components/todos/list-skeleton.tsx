import { Skeleton } from "../ui/skeleton";

export function TodoListSkeleton() {
  return (
    <>
      <ul className="divide-y rounded-sm border">
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i} className="px-2 py-3">
            <Skeleton className="rounded-sm">&nbsp;</Skeleton>
          </li>
        ))}
      </ul>
      <Skeleton className="h-7 rounded-sm mt-2" />
    </>
  );
}
