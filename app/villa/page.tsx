import { SiteShell } from "@/components/public/site-shell";
import { getAmenities, getSiteSettings } from "@/lib/data/store";

export default async function VillaPage() {
  const [settings, amenities] = await Promise.all([getSiteSettings(), getAmenities(true)]);

  return (
    <SiteShell>
      <div className="space-y-8 pb-16 pt-8">
        <h1 className="text-5xl text-[#17130f]">La Villa</h1>
        <div className="luxe-card rounded-2xl p-6">
          <p className="text-lg text-[#3a3026]">{settings.presentation_text}</p>
          <p className="mt-3 text-[#3a3026]">{settings.experience_text}</p>
        </div>

        <section>
          <h2 className="text-4xl text-[#17130f]">Tous les equipements</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => (
              <article key={amenity.id} className="luxe-card rounded-xl p-4">
                <p className="font-semibold text-[#17130f]">{amenity.name}</p>
                <p className="text-sm text-[#4b4137]">{amenity.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
