"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline border border-white/20 hover:bg-white/10",
  ghost: "btn-ghost hover:bg-white/5",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "btn-sm text-xs h-8 px-3",
  md: "h-10 px-4",
  lg: "btn-lg text-lg h-12 px-6",
  icon: "h-10 w-10 p-0 flex items-center justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, leftIcon, rightIcon, children, className, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          "btn inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          VARIANT_CLASS[variant],
          SIZE_CLASS[size],
          className
        )}
        {...rest}
      >
        {isLoading && <Spinner className="mr-2 h-4 w-4" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
