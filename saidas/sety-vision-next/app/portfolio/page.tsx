import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfólio — Sites por Nicho",
  description: "Um site pra cada negócio: odontologia, advocacia, energia solar e mais. Projetos completos, publicados e no ar.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
