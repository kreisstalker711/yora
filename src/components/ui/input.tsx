import type { InputHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-[#DCE2D6] bg-white px-4 text-sm text-[#142218] shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#7AA33C] focus:ring-4 focus:ring-[#7AA33C]/15",
        className,
      )}
      {...props}
    />
  );
}
