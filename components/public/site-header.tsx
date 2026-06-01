import Link from "next/link";
import { getSiteSettings } from "@/lib/data/store";

const nav = [
  ["Accueil", "/"],
  ["Villa", "/villa"],
  ["Galerie", "/galerie"],
  ["Localisation", "/localisation"],
  ["Contact", "/contact"],
] as const;

export async function SiteHeader() {
  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5d8c4]/70 bg-[#f8f3ea]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-wide text-[#1f2a24]">
          {settings.villa_name}
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-[#32443b] hover:text-[#2f6150]">
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-full bg-[#2f6150] px-4 py-2 text-xs font-semibold text-white hover:bg-[#234a3d]"
        >
          Reserver
        </Link>
      </div>
    </header>
  );
}
