import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.whupmedya.com";
const SITE_TITLE = "Whup Medya — Markanızı Dijitalin Zirvesine Taşıyoruz";
const SITE_DESC =
  "Whup Medya: Performans reklamları, viral video prodüksiyonu, marka & web deneyimi. Veri + Kreatif = Whup Etkisi.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: "/",
    siteName: "Whup Medya",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/images/cta-banner.jpg", width: 1600, height: 900, alt: "Whup Medya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/images/cta-banner.jpg"],
  },
  verification: {
    google: "hqK6tCqqY1RE07lqpt6lLnSRJTofaEcwTAzHEHqnYMo",
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Whup Medya",
  url: SITE_URL,
  logo: `${SITE_URL}/images/cta-banner.jpg`,
  description: SITE_DESC,
  address: { "@type": "PostalAddress", addressLocality: "Eskişehir", addressCountry: "TR" },
  contactPoint: { "@type": "ContactPoint", telephone: "+90-850-305-00-00", contactType: "sales" },
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
      <body className="grain bg-base font-body antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </body>
    </html>
  );
}
