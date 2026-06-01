import Link from "next/link";
import { getSiteSettings } from "@/lib/data/store";

const nav = [
  ["Accueil", "/"],
  ["La Villa", "/villa"],
  ["Galerie", "/galerie"],
  ["Localisation", "/localisation"],
  ["Contact", "/contact"],
] as const;

export async function SiteHeader() {
  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-[#c39a5b]/35 bg-[#17130f]/88 text-[#f6f0e7] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-2xl tracking-wide text-[#f3dfbd]">
          {settings.villa_name}
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-[#f6f0e7]/90 transition hover:text-[#f3dfbd]">
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-full border border-[#f3dfbd] bg-[#f3dfbd] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#17130f] transition hover:bg-transparent hover:text-[#f3dfbd]"
        >
          Reserver
        </Link>
      </div>
    </header>
  );
}
