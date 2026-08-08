import type { Metadata } from "next";
import PlataformaClient from "./PlataformaClient";

export const metadata: Metadata = {
  title: "Plataforma — Dashboard, CRM e WhatsApp com IA",
  description: "O software que roda por trás da sua empresa: Dashboard, CRM, WhatsApp com IA, Pipeline, Agenda e Automações num só sistema.",
  alternates: { canonical: "/plataforma" },
};

export default function PlataformaPage() {
  return <PlataformaClient />;
}
