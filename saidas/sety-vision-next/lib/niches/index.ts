import type { NicheConfig } from "@/app/components/niche/NicheLanding";
import { CONFIG as IMOBILIARIAS } from "@/app/imobiliarias/config";
import { CONFIG as ENERGIA_SOLAR } from "@/app/energia-solar/config";
import { CONFIG as CLINICA_ODONTOLOGICA } from "@/app/clinica-odontologica/config";

export const NICHE_CONFIGS: Record<string, NicheConfig> = {
  imobiliarias: IMOBILIARIAS,
  "energia-solar": ENERGIA_SOLAR,
  "clinica-odontologica": CLINICA_ODONTOLOGICA,
};

/** Lida via env var de build (setada por projeto Vercel) — cada site dedicado mostra só o seu nicho na raiz. */
export function getActiveNiche(): NicheConfig | null {
  const key = process.env.NEXT_PUBLIC_NICHE;
  if (!key) return null;
  return NICHE_CONFIGS[key] ?? null;
}
