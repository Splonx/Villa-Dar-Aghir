import Link from "next/link";
import { logoutAdminAction } from "@/app/admin/actions";

const links = [
  ["Dashboard", "/admin/dashboard"],
  ["Photos", "/admin/photos"],
  ["Contenu", "/admin/contenu"],
  ["Equipements", "/admin/equipements"],
  ["Disponibilites", "/admin/disponibilites"],
  ["Demandes", "/admin/demandes"],
  ["SEO", "/admin/seo"],
  ["Parametres", "/admin/parametres"],
] as const;

export function AdminSidebar() {
  return (
    <aside className="rounded-2xl border border-[#d7cab5] bg-white p-4">
      <p className="mb-4 text-lg font-semibold text-[#1f2a24]">Back Office</p>
      <nav className="space-y-1">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block rounded-lg px-3 py-2 text-sm text-[#32443b] hover:bg-[#f0e6d8]"
          >
            {label}
          </Link>
        ))}
      </nav>
      <form action={logoutAdminAction} className="mt-6">
        <button className="w-full rounded-full border border-[#c8baa3] px-4 py-2 text-sm">
          Deconnexion
        </button>
      </form>
    </aside>
  );
}
