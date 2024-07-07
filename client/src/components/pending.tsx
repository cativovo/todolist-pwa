import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Loader2 } from "lucide-react";

export type PendingProps = {
  className?: ClassValue;
};

export default function Pending(props: PendingProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center",
        props.className,
      )}
    >
      <Loader2 className="animate-spin" />
    </div>
  );
}
