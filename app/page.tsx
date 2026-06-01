import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/public/booking-form";
import { FadeIn } from "@/components/public/fade-in";
import { SiteShell } from "@/components/public/site-shell";
import { WhatsappSticky } from "@/components/public/whatsapp-sticky";
import { getAmenities, getHeroPhoto, getPhotos, getSiteSettings } from "@/lib/data/store";
import { toWhatsappLink } from "@/lib/utils";

const quickBadges = [
  "Sans vis-a-vis",
  "Piscine privee",
  "5 min plage",
  "Ouvert toute l'annee",
];

export default async function HomePage() {
  const [settings, heroPhoto, amenities, photos] = await Promise.all([
    getSiteSettings(),
    getHeroPhoto(),
    getAmenities(true),
    getPhotos({ publishedOnly: true }),
  ]);

  const whatsappLink = toWhatsappLink(
    settings.whatsapp_number,
    "Bonjour, je souhaite avoir plus d'informations sur la disponibilite de L'oasis Villa.",
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: settings.villa_name,
    description: settings.meta_description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Aghir",
      addressRegion: "Djerba",
      addressCountry: "TN",
    },
    amenityFeature: amenities.map((item) => ({
      "@type": "LocationFeatureSpecification",
      name: item.name,
      value: true,
    })),
    image: photos.map((photo) => photo.image_url),
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-20 pb-20 pt-8">
        <FadeIn className="relative overflow-hidden rounded-[2rem] border border-[#c39a5b]/35 bg-[#17130f] p-5 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:items-center">
            <div className="relative z-10 space-y-5 text-[#f6f0e7]">
              <p className="text-xs uppercase tracking-[0.25em] text-[#f3dfbd]">
                {settings.villa_name} - Signature Djerba
              </p>
              <h1 className="text-4xl leading-tight md:text-6xl">{settings.hero_title}</h1>
              <p className="max-w-xl text-base text-[#f6f0e7]/85 md:text-lg">
                {settings.hero_subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={whatsappLink}
                  target="_blank"
                  className="rounded-full bg-[#f3dfbd] px-6 py-3 text-sm font-semibold text-[#17130f]"
                >
                  Reserver sur WhatsApp
                </Link>
                <Link
                  href="/galerie"
                  className="rounded-full border border-[#f3dfbd] px-6 py-3 text-sm font-semibold text-[#f3dfbd]"
                >
                  Voir la galerie
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {quickBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[#f3dfbd]/45 px-3 py-1 text-xs text-[#f3dfbd]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] md:min-h-[520px]">
              <Image
                src={heroPhoto.image_url}
                alt={heroPhoto.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>
        </FadeIn>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="luxe-card rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7a5a2b]">Emplacement</p>
            <p className="mt-2 font-serif text-3xl">5 min</p>
            <p className="text-sm text-[#4b4137]">de la plage d&apos;Aghir</p>
          </article>
          <article className="luxe-card rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7a5a2b]">Confort</p>
            <p className="mt-2 font-serif text-3xl">Piscine</p>
            <p className="text-sm text-[#4b4137]">Espace prive et ambiance relaxante</p>
          </article>
          <article className="luxe-card rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7a5a2b]">Disponibilite</p>
            <p className="mt-2 font-serif text-3xl">Toute l&apos;annee</p>
            <p className="text-sm text-[#4b4137]">Reservation ouverte 12/12</p>
          </article>
        </section>

        <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <h2 className="text-4xl text-[#17130f]">Une experience chic et authentique</h2>
            <p className="mt-4 text-[#4b4137]">{settings.presentation_text}</p>
            <p className="mt-3 text-[#4b4137]">{settings.experience_text}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photos.slice(0, 4).map((photo) => (
              <div key={photo.id} className="relative aspect-square overflow-hidden rounded-xl border border-[#c39a5b]/30">
                <Image src={photo.image_url} alt={photo.title} fill loading="lazy" className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-4xl text-[#17130f]">Equipements premium</h2>
            <Link href="/villa" className="text-sm font-semibold text-[#7a5a2b]">
              Tout voir
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => (
              <article key={amenity.id} className="luxe-card rounded-xl p-4">
                <p className="font-semibold text-[#17130f]">{amenity.name}</p>
                <p className="text-sm text-[#4b4137]">{amenity.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div className="luxe-card rounded-2xl p-6">
            <h2 className="text-3xl">Localisation</h2>
            <p className="mt-3 text-[#4b4137]">{settings.location_text}</p>
            <Link href="/localisation" className="mt-4 inline-block text-sm font-semibold text-[#7a5a2b]">
              Voir la localisation
            </Link>
          </div>
          <div>
            <h2 className="text-3xl">Contact reservation</h2>
            <p className="mt-3 text-[#4b4137]">{settings.contact_text}</p>
            <div className="mt-4">
              <BookingForm />
            </div>
          </div>
        </section>
      </div>

      <WhatsappSticky href={whatsappLink} />
    </SiteShell>
  );
}
