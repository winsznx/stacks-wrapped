import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "error";
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          "rounded-lg p-4 text-sm flex gap-3 items-start border",
          variant === "info" && "bg-blue-500/10 text-blue-400 border-blue-500/20",
          variant === "warning" && "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          variant === "error" && "bg-red-500/10 text-red-400 border-red-500/20",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Alert.displayName = "Alert";
