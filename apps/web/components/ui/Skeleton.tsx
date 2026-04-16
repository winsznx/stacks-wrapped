import { cn } from "@/lib/cn";

export interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton", className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
