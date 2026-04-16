import { cn } from "@/lib/cn";

export interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <hr className={cn("divider", className)} aria-hidden="true" />;
}
