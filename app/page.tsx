import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/public/booking-form";
import { FadeIn } from "@/components/public/fade-in";
import { SiteShell } from "@/components/public/site-shell";
import { WhatsappSticky } from "@/components/public/whatsapp-sticky";
import { getAmenities, getHeroPhoto, getPhotos, getSiteSettings } from "@/lib/data/store";
import { toWhatsappLink } from "@/lib/utils";

const quickBadges = ["Sans vis-a-vis", "Piscine privee", "5 min plage", "Ouvert toute l'annee"];

export default async function HomePage() {
  const [settings, heroPhoto, amenities, photos] = await Promise.all([
    getSiteSettings(),
    getHeroPhoto(),
    getAmenities(true),
    getPhotos({ publishedOnly: true }),
  ]);

  const whatsappLink = toWhatsappLink(
    settings.whatsapp_number,
    "Bonjour, je souhaite avoir plus d'informations sur la disponibilite de la Villa Dar Aghir.",
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
      <div className="space-y-16 pb-16 pt-8">
        <FadeIn className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#4a5b52]">Villa Dar Aghir - L&apos;Oasis Djerbienne</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-[#1f2a24] md:text-5xl">
              {settings.hero_title}
            </h1>
            <p className="mt-4 text-lg text-[#32443b]">{settings.hero_subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={whatsappLink} target="_blank" className="rounded-full bg-[#2f6150] px-5 py-3 text-sm font-semibold text-white">
                Reserver sur WhatsApp
              </Link>
              <Link href="/galerie" className="rounded-full border border-[#2f6150] px-5 py-3 text-sm font-semibold text-[#2f6150]">
                Voir la galerie
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {quickBadges.map((badge) => (
                <span key={badge} className="rounded-full bg-[#ecdfc9] px-3 py-1 text-xs font-medium text-[#32443b]">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[#d7cab5] shadow-xl">
            <Image src={heroPhoto.image_url} alt={heroPhoto.title} fill priority className="object-cover" />
          </div>
        </FadeIn>

        <section className="grid gap-4 rounded-3xl bg-[#efe5d6] p-6 md:grid-cols-3">
          <div>
            <p className="text-3xl font-bold text-[#1f2a24]">5 min</p>
            <p className="text-sm text-[#4a5b52]">de la plage d&apos;Aghir</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#1f2a24]">Privatif</p>
            <p className="text-sm text-[#4a5b52]">Piscine et jardin sans vis-a-vis</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#1f2a24]">Toute l&apos;annee</p>
            <p className="text-sm text-[#4a5b52]">Reservation ouverte 12/12</p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl text-[#1f2a24]">Presentation de la villa</h2>
          <p className="mt-3 text-[#32443b]">{settings.presentation_text}</p>
        </section>

        <section>
          <h2 className="font-serif text-3xl text-[#1f2a24]">Equipements</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {amenities.map((amenity) => (
              <article key={amenity.id} className="rounded-xl border border-[#d7cab5] bg-white p-4">
                <p className="font-semibold text-[#1f2a24]">{amenity.name}</p>
                <p className="text-sm text-[#4a5b52]">{amenity.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-3xl text-[#1f2a24]">Galerie</h2>
            <Link href="/galerie" className="text-sm font-semibold text-[#2f6150]">
              Voir tout
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photos.slice(0, 6).map((photo) => (
              <div key={photo.id} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={photo.image_url} alt={photo.title} fill loading="lazy" className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-3xl text-[#1f2a24]">Experience famille & amis</h2>
          <p className="mt-3 text-[#32443b]">{settings.experience_text}</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl text-[#1f2a24]">Localisation</h2>
            <p className="mt-3 text-[#32443b]">{settings.location_text}</p>
            <Link href="/localisation" className="mt-4 inline-block text-sm font-semibold text-[#2f6150]">
              Voir les details de localisation
            </Link>
          </div>
          <div>
            <h2 className="font-serif text-3xl text-[#1f2a24]">Contact reservation</h2>
            <p className="mt-3 text-[#32443b]">{settings.contact_text}</p>
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
