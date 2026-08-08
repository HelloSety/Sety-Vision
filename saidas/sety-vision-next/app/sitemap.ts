import type { MetadataRoute } from "next";

const BASE_URL = "https://www.setystudio.com.br";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "",           priority: 1,   changeFrequency: "weekly" },
  { path: "/servicos",  priority: 0.9, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
  { path: "/resultados", priority: 0.8, changeFrequency: "weekly" },
  { path: "/plataforma", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contato",   priority: 0.7, changeFrequency: "monthly" },
  { path: "/clinicas",  priority: 0.9, changeFrequency: "weekly" },
  { path: "/clinica-odontologica", priority: 0.9, changeFrequency: "weekly" },
  { path: "/advocacia", priority: 0.9, changeFrequency: "weekly" },
  { path: "/energia-solar", priority: 0.9, changeFrequency: "weekly" },
  { path: "/imobiliarias", priority: 0.9, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
