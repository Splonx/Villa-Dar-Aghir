import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminSession } from "@/lib/auth/guards";
import { getDashboardStats } from "@/lib/data/store";

export default async function DashboardPage() {
  await requireAdminSession();
  const stats = await getDashboardStats();

  return (
    <AdminShell
      title="Dashboard"
      description="Vue rapide de l'activite de reservation et du contenu publie."
    >
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-[#d7cab5] bg-white p-4">
          <p className="text-sm text-[#4a5b52]">Demandes recues</p>
          <p className="mt-1 text-3xl font-bold text-[#1f2a24]">{stats.requestCount}</p>
        </div>
        <div className="rounded-2xl border border-[#d7cab5] bg-white p-4">
          <p className="text-sm text-[#4a5b52]">Photos publiees</p>
          <p className="mt-1 text-3xl font-bold text-[#1f2a24]">{stats.photoCount}</p>
        </div>
        <div className="rounded-2xl border border-[#d7cab5] bg-white p-4 md:col-span-2">
          <p className="text-sm text-[#4a5b52]">Statut disponibilite actuelle</p>
          <p className="mt-1 text-3xl font-bold text-[#1f2a24]">{stats.currentAvailabilityStatus}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link className="rounded-xl bg-[#2f6150] px-4 py-3 text-center text-sm font-semibold text-white" href="/admin/photos">
          Ajouter / gerer photos
        </Link>
        <Link className="rounded-xl bg-[#2f6150] px-4 py-3 text-center text-sm font-semibold text-white" href="/admin/contenu">
          Modifier les textes
        </Link>
        <Link className="rounded-xl bg-[#2f6150] px-4 py-3 text-center text-sm font-semibold text-white" href="/admin/disponibilites">
          Bloquer des dates
        </Link>
      </div>

      <section className="rounded-2xl border border-[#d7cab5] bg-white p-4">
        <h2 className="text-lg font-semibold text-[#1f2a24]">Dernieres demandes</h2>
        <div className="mt-3 space-y-3">
          {stats.latestRequests.length === 0 ? (
            <p className="text-sm text-[#4a5b52]">Aucune demande pour le moment.</p>
          ) : (
            stats.latestRequests.map((request) => (
              <div key={request.id} className="rounded-xl border border-[#ecdfc9] p-3">
                <p className="font-medium text-[#1f2a24]">{request.name}</p>
                <p className="text-sm text-[#4a5b52]">
                  {request.start_date} {" -> "} {request.end_date} | {request.status}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </AdminShell>
  );
}
