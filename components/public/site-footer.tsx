import Link from "next/link";
import { getSiteSettings } from "@/lib/data/store";
import { toWhatsappLink } from "@/lib/utils";

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className="mt-20 border-t border-[#c39a5b]/30 bg-[#17130f] text-[#f6f0e7]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-[#f3dfbd]">{settings.villa_name}</p>
          <p className="mt-2 text-sm text-[#f6f0e7]/80">{settings.slogan}</p>
        </div>
        <div className="text-sm text-[#f6f0e7]/80">
          <p>Aghir, Djerba - Tunisie</p>
          <p className="mt-2">Reservation ouverte toute l&apos;annee</p>
        </div>
        <div className="flex gap-3 md:justify-end">
          <Link
            href={toWhatsappLink(
              settings.whatsapp_number,
              "Bonjour, je souhaite reserver L'oasis Villa.",
            )}
            target="_blank"
            className="rounded-full border border-[#f3dfbd] px-4 py-2 text-sm font-semibold text-[#f3dfbd] transition hover:bg-[#f3dfbd] hover:text-[#17130f]"
          >
            WhatsApp
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-[#f3dfbd] px-4 py-2 text-sm font-semibold text-[#17130f]"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
