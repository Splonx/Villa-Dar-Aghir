import { AdminShell } from "@/components/admin/admin-shell";
import {
  createAvailabilityAction,
  deleteAvailabilityAction,
} from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth/guards";
import { getAvailabilityBlocks } from "@/lib/data/store";

const statuses = ["Disponible", "Reserve", "Maintenance", "Bloque"];

export default async function DisponibilitesAdminPage() {
  await requireAdminSession();
  const blocks = await getAvailabilityBlocks();

  return (
    <AdminShell title="Gestion Disponibilites" description="Ajouter ou supprimer des periodes indisponibles.">
      <section className="rounded-2xl border border-[#d7cab5] bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Ajouter une periode</h2>
        <form action={createAvailabilityAction} className="grid gap-3 md:grid-cols-2">
          <input type="date" required name="start_date" className="rounded-xl border px-3 py-2" />
          <input type="date" required name="end_date" className="rounded-xl border px-3 py-2" />
          <select name="status" className="rounded-xl border px-3 py-2">
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <input name="note" placeholder="Note" className="rounded-xl border px-3 py-2" />
          <button className="rounded-full bg-[#2f6150] px-4 py-2 text-white md:col-span-2">Ajouter</button>
        </form>
      </section>

      <section className="space-y-3">
        {blocks.map((block) => (
          <div key={block.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#d7cab5] bg-white p-4">
            <div>
              <p className="font-semibold text-[#1f2a24]">{block.status}</p>
              <p className="text-sm text-[#4a5b52]">
                {block.start_date} {" -> "} {block.end_date}
              </p>
              {block.note ? <p className="text-sm text-[#4a5b52]">{block.note}</p> : null}
            </div>
            <form action={deleteAvailabilityAction}>
              <input type="hidden" name="id" value={block.id} />
              <button className="rounded-full border border-red-300 px-4 py-1 text-sm text-red-700">Supprimer</button>
            </form>
          </div>
        ))}
      </section>
    </AdminShell>
  );
}
