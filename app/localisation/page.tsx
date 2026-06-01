import Link from "next/link";
import { SiteShell } from "@/components/public/site-shell";
import { getSiteSettings } from "@/lib/data/store";
import { toWhatsappLink } from "@/lib/utils";

export default async function LocalisationPage() {
  const settings = await getSiteSettings();

  return (
    <SiteShell>
      <div className="space-y-6 pb-16 pt-8">
        <h1 className="text-5xl text-[#17130f]">Localisation</h1>
        <p className="text-[#4b4137]">{settings.location_text}</p>
        <div className="luxe-card rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#7a5a2b]">Repere</p>
          <p className="mt-2 font-serif text-3xl text-[#17130f]">Aghir, Djerba</p>
          <p className="mt-2 text-sm text-[#4b4137]">A 5 min de la plage et 15 min de Midoun et Houmt Souk.</p>
        </div>
        <Link
          href={toWhatsappLink(
            settings.whatsapp_number,
            "Bonjour, je souhaite recevoir la localisation exacte de L'oasis Villa.",
          )}
          target="_blank"
          className="inline-block rounded-full bg-[#17130f] px-5 py-3 text-sm font-semibold text-[#f3dfbd]"
        >
          Recevoir la localisation sur WhatsApp
        </Link>
      </div>
    </SiteShell>
  );
}
