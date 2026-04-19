import { LabelHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...rest }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white/80",
          className
        )}
        {...rest}
      />
    );
  }
);

Label.displayName = "Label";
