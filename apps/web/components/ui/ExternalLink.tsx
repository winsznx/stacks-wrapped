import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function ExternalLink({ className, href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/40",
        className
      )}
      {...rest}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 opacity-50"
      >
        <path d="M7 7h10v10" />
        <path d="M7 17L17 7" />
      </svg>
    </a>
  );
}
