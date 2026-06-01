import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-[#d8ccb6] bg-white/90 px-3 py-2 text-sm text-[#1f2a24] outline-none ring-offset-2 transition focus:ring-2 focus:ring-[#2f6150]",
        className,
      )}
      {...props}
    />
  );
}
