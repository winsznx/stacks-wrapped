"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn("address-text-input", className)}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
