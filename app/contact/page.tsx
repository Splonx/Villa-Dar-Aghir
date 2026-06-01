import Link from "next/link";
import { BookingForm } from "@/components/public/booking-form";
import { SiteShell } from "@/components/public/site-shell";
import { WhatsappSticky } from "@/components/public/whatsapp-sticky";
import { getAvailabilityBlocks, getSiteSettings } from "@/lib/data/store";
import { toWhatsappLink } from "@/lib/utils";

export default async function ContactPage() {
  const [settings, availability] = await Promise.all([
    getSiteSettings(),
    getAvailabilityBlocks(),
  ]);

  const whatsappLink = toWhatsappLink(
    settings.whatsapp_number,
    "Bonjour, je souhaite avoir plus d'informations sur la disponibilite de la Villa Dar Aghir.",
  );

  return (
    <SiteShell>
      <div className="space-y-8 pb-16 pt-8">
        <h1 className="font-serif text-4xl text-[#1f2a24]">Contact & Reservation</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-[#32443b]">{settings.contact_text}</p>
            <Link href={whatsappLink} target="_blank" className="inline-block rounded-full bg-[#2f6150] px-5 py-3 text-sm font-semibold text-white">
              Reserver sur WhatsApp
            </Link>
            <Link
              href={`https://m.me/${encodeURIComponent(settings.messenger_name)}`}
              target="_blank"
              className="inline-block rounded-full border border-[#2f6150] px-4 py-2 text-sm font-semibold text-[#2f6150]"
            >
              Messenger: {settings.messenger_name}
            </Link>
            <h2 className="pt-3 font-serif text-2xl text-[#1f2a24]">Disponibilites sur demande</h2>
            <div className="space-y-2">
              {availability.map((block) => (
                <div key={block.id} className="rounded-xl border border-[#d7cab5] bg-white p-3 text-sm text-[#32443b]">
                  <p className="font-semibold">{block.status}</p>
                  <p>
                    {block.start_date} {" -> "} {block.end_date}
                  </p>
                  {block.note ? <p>{block.note}</p> : null}
                </div>
              ))}
            </div>
          </div>
          <BookingForm />
        </div>
      </div>
      <WhatsappSticky href={whatsappLink} />
    </SiteShell>
  );
}
