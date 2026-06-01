import { AdminShell } from "@/components/admin/admin-shell";
import {
  createAmenityAction,
  deleteAmenityAction,
  updateAmenityAction,
} from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAmenities } from "@/lib/data/store";

export default async function EquipementsAdminPage() {
  await requireAdminSession();
  const amenities = await getAmenities(false);

  return (
    <AdminShell title="Gestion Equipements" description="CRUD complet des equipements de la villa.">
      <section className="rounded-2xl border border-[#d7cab5] bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Ajouter un equipement</h2>
        <form action={createAmenityAction} className="grid gap-3 md:grid-cols-2">
          <input name="name" required placeholder="Nom" className="rounded-xl border px-3 py-2" />
          <input name="icon" required placeholder="Icune lucide (ex: waves)" className="rounded-xl border px-3 py-2" />
          <input name="description" required placeholder="Description" className="rounded-xl border px-3 py-2 md:col-span-2" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" defaultChecked />Actif</label>
          <button className="rounded-full bg-[#2f6150] px-4 py-2 text-white">Ajouter</button>
        </form>
      </section>

      <section className="space-y-3">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="rounded-2xl border border-[#d7cab5] bg-white p-4">
            <form action={updateAmenityAction} className="grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={amenity.id} />
              <input name="name" defaultValue={amenity.name} className="rounded-xl border px-3 py-2" />
              <input name="icon" defaultValue={amenity.icon} className="rounded-xl border px-3 py-2" />
              <input name="description" defaultValue={amenity.description} className="rounded-xl border px-3 py-2 md:col-span-2" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" defaultChecked={amenity.is_active} />Actif</label>
              <button className="rounded-full bg-[#2f6150] px-4 py-2 text-white">Mettre a jour</button>
            </form>
            <form action={deleteAmenityAction} className="mt-2">
              <input type="hidden" name="id" value={amenity.id} />
              <button className="rounded-full border border-red-300 px-4 py-1 text-sm text-red-700">Supprimer</button>
            </form>
          </div>
        ))}
      </section>
    </AdminShell>
  );
}
