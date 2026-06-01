import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { updateBookingStatusAction } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth/guards";
import { getBookingRequests, getSiteSettings } from "@/lib/data/store";
import { toWhatsappLink } from "@/lib/utils";

const statuses = ["Tous", "Nouveau", "Contacte", "Confirme", "Refuse", "Archive"] as const;

type Props = {
  searchParams: Promise<{ status?: string }>;
};

export default async function DemandesAdminPage({ searchParams }: Props) {
  await requireAdminSession();
  const params = await searchParams;
  const activeStatus: (typeof statuses)[number] = statuses.includes(
    (params.status ?? "") as (typeof statuses)[number],
  )
    ? ((params.status ?? "Tous") as (typeof statuses)[number])
    : "Tous";

  const [requests, settings] = await Promise.all([
    getBookingRequests(activeStatus),
    getSiteSettings(),
  ]);

  return (
    <AdminShell title="Gestion Demandes" description="Suivi des demandes de reservation et changement de statut.">
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <Link
            key={status}
            href={`/admin/demandes?status=${encodeURIComponent(status)}`}
            className={`rounded-full px-4 py-1 text-sm ${
              status === activeStatus
                ? "bg-[#2f6150] text-white"
                : "border border-[#d7cab5] text-[#32443b]"
            }`}
          >
            {status}
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="rounded-2xl border border-[#d7cab5] bg-white p-4 text-sm text-[#4a5b52]">
            Aucune demande pour ce filtre.
          </div>
        ) : (
          requests.map((request) => {
            const whatsappMessage = `Bonjour ${request.name}, merci pour votre demande du ${request.start_date} au ${request.end_date} pour Villa Dar Aghir.`;
            return (
              <div key={request.id} className="rounded-2xl border border-[#d7cab5] bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-[#1f2a24]">{request.name}</p>
                    <p className="text-sm text-[#4a5b52]">{request.phone} {request.email ? `| ${request.email}` : ""}</p>
                    <p className="text-sm text-[#4a5b52]">
                      {request.start_date} {" -> "} {request.end_date} | {request.adults} adultes / {request.children} enfants
                    </p>
                    <p className="mt-2 text-sm text-[#32443b]">{request.message}</p>
                  </div>
                  <div className="space-y-2">
                    <form action={updateBookingStatusAction} className="flex gap-2">
                      <input type="hidden" name="id" value={request.id} />
                      <select name="status" defaultValue={request.status} className="rounded-xl border px-3 py-2 text-sm">
                        {statuses
                          .filter((status) => status !== "Tous")
                          .map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                      </select>
                      <button className="rounded-full bg-[#2f6150] px-4 py-2 text-sm text-white">Maj</button>
                    </form>
                    <Link
                      href={toWhatsappLink(settings.whatsapp_number, whatsappMessage)}
                      target="_blank"
                      className="block rounded-full border border-[#2f6150] px-4 py-2 text-center text-sm text-[#2f6150]"
                    >
                      Contacter WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminShell>
  );
}
