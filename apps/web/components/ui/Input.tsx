"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-medium text-white/70">{label}</label>}
        <input
          ref={ref}
          type={type}
          className={cn(
            "address-text-input transition-all focus:ring-2 focus:ring-white/20",
            error && "border-red-500 focus:ring-red-500/20",
            className
          )}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
