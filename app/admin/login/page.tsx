import Link from "next/link";
import { redirect } from "next/navigation";
import { loginAdminAction } from "@/app/admin/login/actions";
import { getAdminSession } from "@/lib/auth/guards";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const session = await getAdminSession();
  if (session) redirect("/admin/dashboard");

  const params = await searchParams;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#d8ccb6] bg-white p-6 shadow-sm">
        <p className="text-center font-serif text-2xl text-[#1f2a24]">Connexion Admin</p>
        <p className="mt-1 text-center text-sm text-[#4a5b52]">
          Back office Villa Dar Aghir
        </p>

        {params.error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {params.error}
          </p>
        ) : null}

        <form action={loginAdminAction} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-[#d8ccb6] px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-xl border border-[#d8ccb6] px-3 py-2"
            />
          </div>
          <button className="w-full rounded-full bg-[#2f6150] px-4 py-2 font-semibold text-white">
            Se connecter
          </button>
        </form>

        <Link href="/" className="mt-4 block text-center text-sm text-[#2f6150]">
          Retour au site
        </Link>
      </div>
    </div>
  );
}
