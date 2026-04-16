import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type AlertTone = "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
}

const TONE_CLASS: Record<AlertTone, string> = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

export function Alert({ tone = "info", className, ...rest }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn("alert", TONE_CLASS[tone], className)}
      {...rest}
    />
  );
}
