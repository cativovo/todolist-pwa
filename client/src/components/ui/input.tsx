import * as React from "react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const InputPassword = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(({ className, ...props }, ref) => {
  const [type, setType] = useState<"password" | "text">("password");

  function toggleType() {
    setType((prev) => {
      if (prev === "password") {
        return "text";
      }

      return "password";
    });
  }

  const isPassword = type === "password";

  return (
    <div className="flex rounded-md border border-input bg-transparent">
      <input
        type={type}
        className={cn(
          "h-9 w-full px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      <Button
        variant="ghost"
        type="button"
        className="ml-[1px] border-none px-2"
        onClick={toggleType}
      >
        {isPassword ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
});
InputPassword.displayName = "InputPassword";

export { Input, InputPassword };
