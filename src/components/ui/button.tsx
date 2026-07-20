import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
        variant === "default" &&
          "bg-primary text-white shadow-[0_2px_4px_rgba(20,50,42,0.25),0_12px_24px_-6px_rgba(20,50,42,0.35)] hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-[0_4px_8px_rgba(20,50,42,0.3),0_20px_36px_-8px_rgba(20,50,42,0.4)]",
        variant === "outline" &&
          "border border-ink/15 bg-white text-ink shadow-sm hover:-translate-y-0.5 hover:border-gold hover:bg-accent-soft",
        className,
      )}
      {...props}
    />
  );
}
