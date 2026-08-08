// Catálogo de projetos do Portfólio — cada um é um site fictício, independente,
// com deploy próprio na Vercel. `url: null` = ainda não publicado (mostra "Em breve").
export type PortfolioItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  color: string;
  url: string | null;
  image?: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: "dental",      name: "Sety Dental",      category: "Odontologia",   description: "Clínica odontológica premium — agendamento, tratamentos e antes/depois.", color: "#2563EB", url: "https://sety-dental.vercel.app", image: "/portfolio/dental.webp" },
  { id: "advocacia",   name: "Sety Law",         category: "Advocacia",     description: "Escritório de advocacia sofisticado — áreas de atuação e equipe.",          color: "#0F172A", url: "https://sety-law.vercel.app", image: "/portfolio/advocacia.webp" },
  { id: "solar",       name: "Sety Solar",       category: "Energia Solar", description: "Instaladora de energia solar — calculadora de economia e projetos.",       color: "#F59E0B", url: "https://sety-solar.vercel.app", image: "/portfolio/solar.webp" },
  { id: "imoveis",     name: "Sety Imóveis",     category: "Imobiliária",   description: "Imobiliária boutique — curadoria de imóveis, tour virtual e corretores por região.", color: "#0F766E", url: "https://sety-imoveis.vercel.app", image: "/portfolio/imoveis.webp" },
  { id: "consorcio",   name: "Sety Consórcio",   category: "Consórcio de Veículos", description: "Consórcio de carros e motos — cartas de crédito, contemplação por sorteio ou lance.", color: "#B3122A", url: "https://sety-consorcio.vercel.app", image: "/portfolio/consorcio.webp" },
];
