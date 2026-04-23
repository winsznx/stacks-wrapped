import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable, glass, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-white/10 bg-white/5 p-6 transition-all",
          hoverable && "hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1",
          glass && "backdrop-blur-md bg-white/2",
          className
        )}
        {...rest}
      />
    );
  }
);

Card.displayName = "Card";
