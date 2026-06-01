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
    "Bonjour, je souhaite avoir plus d'informations sur la disponibilite de L'oasis Villa.",
  );

  return (
    <SiteShell>
      <div className="space-y-8 pb-16 pt-8">
        <h1 className="text-5xl text-[#17130f]">Contact & Reservation</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-[#4b4137]">{settings.contact_text}</p>
            <Link href={whatsappLink} target="_blank" className="inline-block rounded-full bg-[#17130f] px-5 py-3 text-sm font-semibold text-[#f3dfbd]">
              Reserver sur WhatsApp
            </Link>
            <Link
              href={`https://m.me/${encodeURIComponent(settings.messenger_name)}`}
              target="_blank"
              className="inline-block rounded-full border border-[#7a5a2b] px-4 py-2 text-sm font-semibold text-[#7a5a2b]"
            >
              Messenger: {settings.messenger_name}
            </Link>
            <h2 className="pt-3 text-3xl text-[#17130f]">Disponibilites sur demande</h2>
            <div className="space-y-2">
              {availability.map((block) => (
                <div key={block.id} className="luxe-card rounded-xl p-3 text-sm text-[#3a3026]">
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
