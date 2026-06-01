import Link from "next/link";
import { SiteShell } from "@/components/public/site-shell";
import { getSiteSettings } from "@/lib/data/store";
import { toWhatsappLink } from "@/lib/utils";

export default async function LocalisationPage() {
  const settings = await getSiteSettings();

  return (
    <SiteShell>
      <div className="space-y-6 pb-16 pt-8">
        <h1 className="font-serif text-4xl text-[#1f2a24]">Localisation</h1>
        <p className="text-[#32443b]">{settings.location_text}</p>
        <div className="rounded-2xl border border-[#d7cab5] bg-[#efe5d6] p-5">
          <p className="text-sm text-[#32443b]">Repere:</p>
          <p className="mt-1 font-semibold text-[#1f2a24]">Aghir, Djerba - a 5 min de la plage</p>
          <p className="mt-3 text-sm text-[#4a5b52]">A 15 min de Midoun et Houmt Souk.</p>
        </div>
        <Link
          href={toWhatsappLink(
            settings.whatsapp_number,
            "Bonjour, je souhaite recevoir la localisation exacte de la Villa Dar Aghir.",
          )}
          target="_blank"
          className="inline-block rounded-full bg-[#2f6150] px-5 py-3 text-sm font-semibold text-white"
        >
          Recevoir la localisation par WhatsApp
        </Link>
      </div>
    </SiteShell>
  );
}
