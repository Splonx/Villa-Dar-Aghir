import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-[#c39a5b]/40 bg-white/90 px-3 py-2 text-sm text-[#17130f] outline-none ring-offset-2 transition focus:ring-2 focus:ring-[#c39a5b]",
        className,
      )}
      {...props}
    />
  );
}
