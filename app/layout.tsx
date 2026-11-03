import type { Metadata, Viewport } from "next";
import { Inter_Tight, Cormorant_Garamond } from "next/font/google";
import { fullName, site } from "@/lib/site";
import "./globals.css";

const grotesk = Inter_Tight({ subsets: ["latin", "cyrillic"], variable: "--font-grotesk", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin", "cyrillic"], style: ["italic"], weight: ["500", "600"], variable: "--font-cormorant", display: "swap" });

const title = `${fullName} — ведущий современных свадеб`;
const description = "Современные свадьбы с характером, эмоциями и атмосферой. Проверьте, свободна ли ваша дата.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: { title, description, type: "website", locale: "ru_RU", images: ["/media/ig-mic.jpg"] },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#070707", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    jobTitle: "Ведущий свадеб",
    url: site.url,
  };
  return (
    <html lang="ru" className={`${grotesk.variable} ${serif.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        {children}
      </body>
    </html>
  );
}
