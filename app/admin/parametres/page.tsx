import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminSession } from "@/lib/auth/guards";
import { env, isSupabaseAdminEnabled, isSupabaseEnabled } from "@/lib/env";

export default async function ParametresAdminPage() {
  await requireAdminSession();

  return (
    <AdminShell title="Parametres" description="Informations de configuration et securite.">
      <div className="space-y-3 rounded-2xl border border-[#d7cab5] bg-white p-4 text-sm text-[#32443b]">
        <p>
          Supabase lecture publique: <strong>{isSupabaseEnabled ? "Actif" : "Non configure"}</strong>
        </p>
        <p>
          Supabase admin (service role): <strong>{isSupabaseAdminEnabled ? "Actif" : "Non configure"}</strong>
        </p>
        <p>
          Email admin actif: <strong>{env.adminEmail}</strong>
        </p>
        <p>
          Mode fallback local: <strong>{isSupabaseAdminEnabled ? "Desactive" : "Active"}</strong>
        </p>
      </div>
    </AdminShell>
  );
}
