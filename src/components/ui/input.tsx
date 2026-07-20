import type { InputHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-[var(--radius-md)] border border-ink/15 bg-white px-4 text-sm text-ink shadow-sm outline-none transition-all duration-200 placeholder:text-ink-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15",
        className,
      )}
      {...props}
    />
  );
}
