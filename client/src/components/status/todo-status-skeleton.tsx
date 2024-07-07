import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";
import { Skeleton } from "../ui/skeleton";

export type TodosStatusSkeletonProps = {
  className?: ClassValue;
};

export default function TodosStatusSkeleton(props: TodosStatusSkeletonProps) {
  return (
    <Skeleton
      className={cn("inline-block h-6 w-20 rounded-md", props.className)}
    />
  );
}
