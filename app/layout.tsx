import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Villa Dar Aghir - Location villa privee avec piscine a Djerba",
  description:
    "Villa djerbienne sans vis-a-vis a Aghir, Djerba. Piscine privee, jardin, espace enfant, salle de sport, a 5 min de la plage.",
  openGraph: {
    title: "Villa Dar Aghir - L'Oasis Djerbienne",
    description:
      "Villa privee premium a Djerba avec piscine, jardin, espace enfant et reservation toute l'annee.",
    images: ["/images/villa/hero.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-[#f8f3ea] text-[#1f2a24]">{children}</body>
    </html>
  );
}
