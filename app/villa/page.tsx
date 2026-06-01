import { SiteShell } from "@/components/public/site-shell";
import { getAmenities, getSiteSettings } from "@/lib/data/store";

export default async function VillaPage() {
  const [settings, amenities] = await Promise.all([getSiteSettings(), getAmenities(true)]);

  return (
    <SiteShell>
      <div className="space-y-8 pb-16 pt-8">
        <h1 className="font-serif text-4xl text-[#1f2a24]">La Villa</h1>
        <p className="text-lg text-[#32443b]">{settings.presentation_text}</p>
        <p className="text-[#32443b]">{settings.experience_text}</p>

        <section>
          <h2 className="font-serif text-3xl text-[#1f2a24]">Tous les equipements</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {amenities.map((amenity) => (
              <article key={amenity.id} className="rounded-xl border border-[#d7cab5] bg-white p-4">
                <p className="font-semibold text-[#1f2a24]">{amenity.name}</p>
                <p className="text-sm text-[#4a5b52]">{amenity.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
