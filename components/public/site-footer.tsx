import Link from "next/link";
import { getSiteSettings } from "@/lib/data/store";
import { toWhatsappLink } from "@/lib/utils";

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className="mt-20 border-t border-[#dacdb8] bg-[#efe5d6]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-[#1f2a24]">{settings.villa_name}</p>
          <p className="mt-2 text-sm text-[#4a5b52]">{settings.slogan}</p>
        </div>
        <div className="text-sm text-[#32443b]">
          <p>Reservation ouverte toute l&apos;annee</p>
          <p className="mt-2">Aghir, Djerba - Tunisie</p>
        </div>
        <div className="flex gap-3 md:justify-end">
          <Link
            href={toWhatsappLink(
              settings.whatsapp_number,
              "Bonjour, je souhaite reserver la Villa Dar Aghir.",
            )}
            target="_blank"
            className="rounded-full border border-[#2f6150] px-4 py-2 text-sm font-semibold text-[#2f6150]"
          >
            WhatsApp
          </Link>
          <Link
            href={`/contact`}
            className="rounded-full bg-[#2f6150] px-4 py-2 text-sm font-semibold text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
