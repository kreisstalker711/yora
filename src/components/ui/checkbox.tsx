import type { InputHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

export function Checkbox({
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-accent/40 text-primary accent-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}
