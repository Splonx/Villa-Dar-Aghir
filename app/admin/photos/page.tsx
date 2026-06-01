import Image from "next/image";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  createPhotoAction,
  deletePhotoAction,
  updatePhotoAction,
} from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth/guards";
import { getPhotos } from "@/lib/data/store";

const categories = [
  "Exterieur",
  "Piscine",
  "Chambres",
  "Salon",
  "Cuisine",
  "Jardin",
  "Espace enfant",
  "Salle de sport",
];

export default async function PhotosAdminPage() {
  await requireAdminSession();
  const photos = await getPhotos();

  return (
    <AdminShell title="Gestion Photos" description="Ajouter, publier, ordonner et definir la photo hero.">
      <section className="rounded-2xl border border-[#d7cab5] bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Ajouter une photo</h2>
        <form action={createPhotoAction} className="grid gap-3 md:grid-cols-2">
          <input name="title" required placeholder="Titre" className="rounded-xl border px-3 py-2" />
          <input
            name="image_url"
            required
            placeholder="/images/villa/villa-15.jpeg ou URL"
            className="rounded-xl border px-3 py-2"
          />
          <select name="category" className="rounded-xl border px-3 py-2">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input name="sort_order" defaultValue={99} type="number" className="rounded-xl border px-3 py-2" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" defaultChecked />Publiee</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_hero" />Image hero</label>
          <button className="rounded-full bg-[#2f6150] px-4 py-2 text-white md:col-span-2">Ajouter</button>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {photos.map((photo) => (
          <div key={photo.id} className="rounded-2xl border border-[#d7cab5] bg-white p-3">
            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={photo.image_url} alt={photo.title} fill className="object-cover" />
            </div>
            <form action={updatePhotoAction} className="space-y-2">
              <input type="hidden" name="id" value={photo.id} />
              <input name="title" defaultValue={photo.title} className="w-full rounded-xl border px-3 py-2" />
              <input
                name="image_url"
                defaultValue={photo.image_url}
                className="w-full rounded-xl border px-3 py-2"
              />
              <div className="grid grid-cols-2 gap-2">
                <select name="category" defaultValue={photo.category} className="rounded-xl border px-3 py-2">
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="sort_order"
                  defaultValue={photo.sort_order}
                  className="rounded-xl border px-3 py-2"
                />
              </div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" defaultChecked={photo.is_published} />Publiee</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_hero" defaultChecked={photo.is_hero} />Hero</label>
              <div className="flex gap-2">
                <button className="rounded-full bg-[#2f6150] px-4 py-2 text-sm text-white">Enregistrer</button>
              </div>
            </form>
            <form action={deletePhotoAction} className="mt-2">
              <input type="hidden" name="id" value={photo.id} />
              <button className="rounded-full border border-red-300 px-4 py-1 text-sm text-red-700">Supprimer</button>
            </form>
          </div>
        ))}
      </section>
    </AdminShell>
  );
}

