import { GalleryGrid } from "@/components/public/gallery-grid";
import { SiteShell } from "@/components/public/site-shell";
import { getPhotos } from "@/lib/data/store";

export default async function GaleriePage() {
  const photos = await getPhotos({ publishedOnly: true });

  return (
    <SiteShell>
      <div className="space-y-6 pb-16 pt-8">
        <h1 className="text-5xl text-[#17130f]">Galerie</h1>
        <p className="text-[#4b4137]">Explorez les espaces exterieurs et interieurs de L&apos;oasis Villa.</p>
        <GalleryGrid photos={photos} />
      </div>
    </SiteShell>
  );
}
