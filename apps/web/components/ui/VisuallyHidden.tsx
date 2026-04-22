import { HTMLAttributes, ElementType } from "react";
import { cn } from "@/lib/cn";

interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export function VisuallyHidden({ as: Component = "span", className, ...rest }: VisuallyHiddenProps) {
  return (
    <Component
      className={cn(
        "absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0",
        className
      )}
      {...rest}
    />
  );
}
