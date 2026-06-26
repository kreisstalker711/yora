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
        "inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AA33C] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
        variant === "default" &&
          "bg-gradient-to-r from-[#1F4D2E] to-[#3F7B2C] text-white shadow-lg shadow-[#1F4D2E]/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1F4D2E]/25",
        variant === "outline" &&
          "border border-[#DFE4D8] bg-white text-[#142218] shadow-sm hover:-translate-y-0.5 hover:border-[#AFC878] hover:bg-[#F8F5EE]",
        className,
      )}
      {...props}
    />
  );
}
