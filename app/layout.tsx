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
  title: "L'oasis Villa - Location villa privee avec piscine a Djerba",
  description:
    "L'oasis Villa a Aghir, Djerba: villa privee sans vis-a-vis, piscine, jardin et confort premium a 5 min de la plage.",
  openGraph: {
    title: "L'oasis Villa - Sejour premium a Djerba",
    description:
      "Villa djerbienne privee pour familles et amis, avec piscine, jardin et reservation toute l'annee.",
    images: ["/images/villa/villa-15.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen text-[#17130f]">{children}</body>
    </html>
  );
}
