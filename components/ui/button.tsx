import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-[#f3dfbd] bg-[#17130f] px-5 py-3 text-sm font-semibold text-[#f3dfbd] transition hover:bg-[#f3dfbd] hover:text-[#17130f] disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
