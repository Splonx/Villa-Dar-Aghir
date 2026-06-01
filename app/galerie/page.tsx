import { GalleryGrid } from "@/components/public/gallery-grid";
import { SiteShell } from "@/components/public/site-shell";
import { getPhotos } from "@/lib/data/store";

export default async function GaleriePage() {
  const photos = await getPhotos({ publishedOnly: true });

  return (
    <SiteShell>
      <div className="space-y-6 pb-16 pt-8">
        <h1 className="font-serif text-4xl text-[#1f2a24]">Galerie</h1>
        <p className="text-[#32443b]">Explorez les espaces exterieurs et interieurs de la villa.</p>
        <GalleryGrid photos={photos} />
      </div>
    </SiteShell>
  );
}
