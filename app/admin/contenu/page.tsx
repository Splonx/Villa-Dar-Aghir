import { AdminShell } from "@/components/admin/admin-shell";
import { upsertContentSettingsAction } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth/guards";
import { getSiteSettings } from "@/lib/data/store";

export default async function ContenuAdminPage() {
  await requireAdminSession();
  const settings = await getSiteSettings();

  return (
    <AdminShell title="Gestion Contenu" description="Modifier les textes et informations de marque.">
      <form action={upsertContentSettingsAction} className="space-y-4 rounded-2xl border border-[#d7cab5] bg-white p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <input name="villa_name" defaultValue={settings.villa_name} placeholder="Nom villa" className="rounded-xl border px-3 py-2" />
          <input name="slogan" defaultValue={settings.slogan} placeholder="Slogan" className="rounded-xl border px-3 py-2" />
          <input name="whatsapp_number" defaultValue={settings.whatsapp_number} placeholder="WhatsApp" className="rounded-xl border px-3 py-2" />
          <input name="messenger_name" defaultValue={settings.messenger_name} placeholder="Messenger" className="rounded-xl border px-3 py-2" />
        </div>

        <input name="hero_title" defaultValue={settings.hero_title} className="w-full rounded-xl border px-3 py-2" />
        <input name="hero_subtitle" defaultValue={settings.hero_subtitle} className="w-full rounded-xl border px-3 py-2" />

        <textarea name="presentation_text" defaultValue={settings.presentation_text} rows={4} className="w-full rounded-xl border px-3 py-2" />
        <textarea name="experience_text" defaultValue={settings.experience_text} rows={4} className="w-full rounded-xl border px-3 py-2" />
        <textarea name="location_text" defaultValue={settings.location_text} rows={3} className="w-full rounded-xl border px-3 py-2" />
        <textarea name="contact_text" defaultValue={settings.contact_text} rows={3} className="w-full rounded-xl border px-3 py-2" />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="show_calendar" defaultChecked={settings.show_calendar} />
          Afficher le calendrier public
        </label>

        <button className="rounded-full bg-[#2f6150] px-5 py-2 text-white">Enregistrer le contenu</button>
      </form>
    </AdminShell>
  );
}
