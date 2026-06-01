import { AdminShell } from "@/components/admin/admin-shell";
import { upsertSeoSettingsAction } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth/guards";
import { getSiteSettings } from "@/lib/data/store";

export default async function SeoAdminPage() {
  await requireAdminSession();
  const settings = await getSiteSettings();

  return (
    <AdminShell title="Gestion SEO" description="Modifier meta tags, OG et mots-cles principaux.">
      <form action={upsertSeoSettingsAction} className="space-y-4 rounded-2xl border border-[#d7cab5] bg-white p-4">
        <input name="meta_title" defaultValue={settings.meta_title} className="w-full rounded-xl border px-3 py-2" />
        <textarea name="meta_description" defaultValue={settings.meta_description} rows={3} className="w-full rounded-xl border px-3 py-2" />
        <input name="og_title" defaultValue={settings.og_title} className="w-full rounded-xl border px-3 py-2" />
        <textarea name="og_description" defaultValue={settings.og_description} rows={3} className="w-full rounded-xl border px-3 py-2" />
        <input name="og_image_url" defaultValue={settings.og_image_url} className="w-full rounded-xl border px-3 py-2" />
        <textarea name="keywords" defaultValue={settings.keywords} rows={2} className="w-full rounded-xl border px-3 py-2" />
        <button className="rounded-full bg-[#2f6150] px-5 py-2 text-white">Enregistrer SEO</button>
      </form>
    </AdminShell>
  );
}
