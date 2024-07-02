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
  switch (status) {
    case StatusTodo.Todo: {
      return {
        icon: <Timer />,
        label: "Todo",
        color: "bg-[#85C1E9]",
      };
    }
    case StatusTodo.InProgress: {
      return {
        icon: <Circle />,
        label: "In Progress",
        color: "bg-[#F8C471]",
      };
    }
    case StatusTodo.Done: {
      return {
        icon: <CircleCheckBig />,
        label: "Done",
        color: "bg-[#82E0AA]",
      };
    }
    case StatusTodo.Cancelled: {
      return {
        icon: <CircleSlash2 />,
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

export default function TodoStatus(props: TodoStatusProps) {
  const { icon, label, color } = getDisplay(props.status);

  return (
    <div
      className={cn("flex gap-2 rounded-md px-2 py-1", color, props.className)}
    >
      {icon}
      {label}
    </div>
  );
}
