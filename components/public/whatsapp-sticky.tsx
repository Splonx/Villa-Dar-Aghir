"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

type Props = {
  href: string;
};

export function WhatsappSticky({ href }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      className="fixed bottom-5 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#20b058] px-4 py-3 text-sm font-semibold text-white shadow-lg md:hidden"
    >
      <MessageCircle size={18} />
      WhatsApp
    </Link>
  );
}
