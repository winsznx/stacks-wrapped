import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({ orientation = "horizontal", className, ...rest }: DividerProps) {
  return (
    <div
      className={cn(
        "bg-white/10 shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full my-4" : "w-[1px] h-full mx-4",
        className
      )}
      {...rest}
    />
  );
}
