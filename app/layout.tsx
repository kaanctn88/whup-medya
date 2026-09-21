import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whup Medya — Markanızı Dijitalin Zirvesine Taşıyoruz",
  description:
    "Whup Medya: Performans reklamları, viral video prodüksiyonu, marka & web deneyimi. Veri + Kreatif = Whup Etkisi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain bg-base font-body antialiased">{children}</body>
    </html>
  );
}
