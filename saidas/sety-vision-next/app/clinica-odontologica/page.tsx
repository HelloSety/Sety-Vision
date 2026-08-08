import type { Metadata } from "next";
import { NicheLanding } from "@/app/components/niche/NicheLanding";
import { CONFIG } from "./config";

const TITLE = "IA no WhatsApp para Clínicas Odontológicas — Nunca mais perca um paciente | Sety Vision";
const DESCRIPTION = "Automação com IA para clínicas odontológicas: responde no WhatsApp em segundos, agenda sozinha e reativa paciente que não voltou pro retorno. Diagnóstico gratuito.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://sety-vision-next.vercel.app/clinica-odontologica" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function ClinicaOdontologicaPage() {
  return <NicheLanding config={CONFIG} />;
}
