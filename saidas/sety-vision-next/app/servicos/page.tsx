import type { Metadata } from "next";
import ServicosClient from "./ServicosClient";

export const metadata: Metadata = {
  title: "Serviços — Site, Automação WhatsApp e Tráfego Pago",
  description: "Site profissional (Shopify, Nuvemshop, institucional), automação de WhatsApp com IA e CRM, e tráfego pago com Meta Ads e Google Ads. Tudo conectado.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return <ServicosClient />;
}
