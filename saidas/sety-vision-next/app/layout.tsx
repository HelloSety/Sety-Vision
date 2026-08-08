import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CursorGlow }     from "./components/ui/CursorGlow";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { MetaPixel } from "./components/analytics/MetaPixel";
import { FAQS } from "@/lib/faq-data";
import { WA_NUMBER } from "@/lib/whatsapp";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://www.setystudio.com.br";
const TITLE = "Sety Studio — Sites, Automações e Tráfego Pago para Empresas que Querem Crescer";
const DESCRIPTION = "Estrutura digital completa pra vender mais: site profissional, automação de WhatsApp com IA e campanhas de tráfego pago. Diagnóstico gratuito.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Sety Studio" },
  description: DESCRIPTION,
  keywords: "site profissional, automação de WhatsApp, IA no WhatsApp, CRM, tráfego pago, Meta Ads, Google Ads, agência digital, landing page, loja Shopify, loja Nuvemshop",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Sety Studio",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/dashboard/demo-showcase.webp", width: 1600, height: 880, alt: "Painel Sety Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#2563EB",
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sety Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: DESCRIPTION,
  slogan: "Sites, Automações e Tráfego Pago para Empresas que Querem Crescer.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${WA_NUMBER}`,
    contactType: "sales",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sety Studio",
  url: SITE_URL,
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-[#0A0A0A]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
        <MetaPixel />
        <ScrollProgress />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
