"use client";

import type React from "react";

const ICONS: Record<string, React.ReactNode> = {
  Cores: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 000 16z" fill="currentColor" stroke="none" />
    </svg>
  ),
  Rodas: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 4v6M12 14v6M4 12h6M14 12h6" />
    </svg>
  ),
  Materiais: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  ),
};

// Bancos/Opções/Tecnologia/Pacotes/Acessórios ficam de fora por enquanto —
// clicar num ícone sem painel nenhum abrindo lê como bug, não minimalismo.
// Reintroduzir só quando cada painel existir de verdade.
const CATEGORIES = Object.keys(ICONS);

export default function Toolbar({
  active,
  onSelect,
  price,
}: {
  active: string | null;
  onSelect: (name: string) => void;
  price: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 px-6 pb-8 sm:px-10">
      <span className="pointer-events-auto hidden rounded-full border border-ink/15 px-5 py-2.5 text-[12px] text-ink sm:inline-block">
        Ficha técnica
      </span>

      <div className="pointer-events-auto flex flex-1 justify-center gap-2 overflow-x-auto sm:gap-6">
        {CATEGORIES.map((name) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className="flex flex-col items-center gap-2 rounded-2xl px-2 py-1 text-ink"
          >
            <span
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                active === name ? "border-ink bg-ink text-paper" : "border-ink/15 bg-white/70 text-ink"
              }`}
            >
              {ICONS[name]}
            </span>
            <span className="whitespace-nowrap text-[11px] text-mist">{name}</span>
          </button>
        ))}
      </div>

      <div className="flex-shrink-0 rounded-2xl bg-ink px-4 py-3 text-paper sm:px-6 sm:py-4">
        <div className="text-[10px] uppercase tracking-[0.2em] text-paper/60 sm:text-[11px]">Investimento</div>
        <div className="whitespace-nowrap text-[13px] font-medium sm:text-lg">{price}</div>
      </div>
    </div>
  );
}
