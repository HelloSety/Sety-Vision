import type { Metadata } from "next";
import ResultadosClient from "./ResultadosClient";

export const metadata: Metadata = {
  title: "Resultados — Números Reais de Campanha",
  description: "O desempenho real das campanhas e automações da Sety Studio: conversas geradas, custo por conversa e faturamento de clientes. Sem print, sem enfeite.",
  alternates: { canonical: "/resultados" },
};

export default function ResultadosPage() {
  return <ResultadosClient />;
}
