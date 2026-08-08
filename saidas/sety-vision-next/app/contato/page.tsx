import type { Metadata } from "next";
import ContatoClient from "./ContatoClient";

export const metadata: Metadata = {
  title: "Contato — Fale com a Sety Studio",
  description: "Resposta rápida pelo WhatsApp, sem formulário burocrático. Diagnóstico gratuito para sua empresa.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return <ContatoClient />;
}
