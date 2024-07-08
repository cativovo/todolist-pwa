import { cn } from "@/lib/utils";
import { StatusTodo, Todo } from "@/schema/todo";
import { ReactNode } from "@tanstack/react-router";
import { ClassValue } from "clsx";
import { Circle, CircleCheckBig, CircleSlash2, Timer } from "lucide-react";

type TodoStatusProps = {
  status: Todo["status"];
  className?: ClassValue;
};

// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
function getDisplay(status: TodoStatusProps["status"]): {
  icon: ReactNode;
  label: string;
  color: string;
} {
  const iconClassName = "h-4 w-4";

  switch (status) {
    case StatusTodo.Todo: {
      return {
        icon: <Timer className={iconClassName} />,
        label: "ToDo",
        color: "bg-[#85C1E9]",
      };
    }
    case StatusTodo.InProgress: {
      return {
        icon: <Circle className={iconClassName} />,
        label: "In Progress",
        color: "bg-[#F8C471]",
      };
    }
    case StatusTodo.Done: {
      return {
        icon: <CircleCheckBig className={iconClassName} />,
        label: "Done",
        color: "bg-[#82E0AA]",
      };
    }
    case StatusTodo.Cancelled: {
      return {
        icon: <CircleSlash2 className={iconClassName} />,
        label: "Cancelled",
        color: "bg-[#F5B7B1]",
      };
    }
    default:
      console.error(`invalid status: ${status}`);
      return {
        icon: null,
        label: "",
        color: "",
      };
  }
}

export function TodoStatus(props: TodoStatusProps) {
  const { icon, label, color } = getDisplay(props.status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md p-1",
        color,
        props.className,
      )}
    >
      {icon}
      {label}
    </span>
  );
}
