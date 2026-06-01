import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function AdminShell({ title, description, children }: Props) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <main className="space-y-4">
        <div>
          <h1 className="font-serif text-3xl text-[#1f2a24]">{title}</h1>
          {description ? <p className="mt-1 text-sm text-[#4a5b52]">{description}</p> : null}
        </div>
        {children}
      </main>
    </div>
  );
}
