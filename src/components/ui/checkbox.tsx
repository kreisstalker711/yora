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
        "h-4 w-4 rounded border-[#B9C8AE] text-[#1F4D2E] accent-[#1F4D2E] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AA33C] focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}
