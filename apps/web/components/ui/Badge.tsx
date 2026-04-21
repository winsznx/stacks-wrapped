import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";
type BadgeVariant = "filled" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: BadgeVariant;
}

const TONE_CLASS: Record<BadgeTone, string> = {
  neutral: "bg-white/10 text-white/70",
  success: "bg-green-500/20 text-green-400 border-green-500/50",
  warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  danger: "bg-red-500/20 text-red-400 border-red-500/50",
  info: "bg-blue-500/20 text-blue-400 border-blue-500/50",
};

export function Badge({ tone = "neutral", variant = "filled", className, ...rest }: BadgeProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border border-transparent",
        TONE_CLASS[tone],
        variant === "outline" && "bg-transparent border-current",
        className
      )} 
      {...rest} 
    />
  );
}
