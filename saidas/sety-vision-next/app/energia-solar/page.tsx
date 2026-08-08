import type { Metadata } from "next";
import { NicheLanding } from "@/app/components/niche/NicheLanding";
import { CONFIG } from "./config";

const TITLE = "IA no WhatsApp para Energia Solar — Nunca mais perca um orçamento | Sety Vision";
const DESCRIPTION = "Automação com IA para instaladoras de energia solar: qualifica o lead, faz follow-up automático de longo prazo e organiza funis residencial e comercial. Diagnóstico gratuito.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://sety-vision-next.vercel.app/energia-solar" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function EnergiaSolarPage() {
  return <NicheLanding config={CONFIG} />;
}
