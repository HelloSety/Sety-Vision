import type { Metadata } from "next";
import { NicheLanding } from "@/app/components/niche/NicheLanding";
import { CONFIG } from "./config";

const TITLE = "IA no WhatsApp para Imobiliárias — Nunca mais perca um cliente | Sety Vision";
const DESCRIPTION = "Automação com IA para imobiliárias: responde no WhatsApp em segundos, qualifica o interesse do cliente e organiza visitas e propostas no CRM. Diagnóstico gratuito.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://sety-vision-next.vercel.app/imobiliarias" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function ImobiliariasPage() {
  return <NicheLanding config={CONFIG} />;
}
