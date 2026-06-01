import { ReactNode } from "react";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";

type Props = { children: ReactNode };

export async function SiteShell({ children }: Props) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4">{children}</main>
      <SiteFooter />
    </>
  );
}
