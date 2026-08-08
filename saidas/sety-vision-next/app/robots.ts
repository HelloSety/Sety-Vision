import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/painel", "/crm", "/api"] },
    ],
    sitemap: "https://sety-vision-next.vercel.app/sitemap.xml",
  };
}
