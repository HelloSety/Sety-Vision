"use client";

import { CAR_MODELS } from "../scene/CarModel";

const TAGLINES: Record<string, string> = {
  "type-01": "Versatilidade que não abre mão do caráter esportivo.",
  "type-02": "Engenharia de pista, homologada pra rua.",
  "type-03": "Precisão alemã, instinto de pista.",
  "type-04": "Presença absoluta, em qualquer terreno.",
  "type-05": "Híbrido, leve, implacável — céu aberto.",
  "type-06": "Elegância atemporal, coração de motor central.",
  "type-07": "O primeiro SUV com alma de esportivo puro.",
  "type-08": "Grand tourer de quatro lugares, sem compromissos.",
  "type-09": "O ícone. Simplesmente atemporal.",
};

export default function ModelOverview({ onSelect }: { onSelect: (index: number) => void }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-paper px-6 pb-20 pt-32 sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10">
        <button className="pointer-events-auto flex flex-col gap-[5px]" aria-label="Menu">
          <span className="h-[1.5px] w-6 bg-ink" />
          <span className="h-[1.5px] w-6 bg-ink" />
          <span className="h-[1.5px] w-6 bg-ink" />
        </button>
        <span className="text-[15px] font-medium tracking-[0.3em] text-ink">VELTRA</span>
        <button className="pointer-events-auto rounded-full bg-ink px-5 py-2.5 text-[12px] font-medium text-paper">
          Encontrar concessionária
        </button>
      </div>

      <div className="mx-auto text-center">
        <span className="text-[12px] uppercase tracking-[0.3em] text-mist">Visão geral</span>
        <h1 className="mt-3 text-4xl font-light tracking-tight text-ink sm:text-5xl">Modelos Veltra</h1>
      </div>

      <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CAR_MODELS.map((car, i) => (
          <button
            key={car.id}
            onClick={() => onSelect(i)}
            className="group flex h-full flex-col items-center gap-4 overflow-hidden rounded-3xl border border-ink/8 bg-white/60 pb-8 text-center transition-colors hover:border-ink/20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/car-thumbs/${car.id}.png`}
              alt={car.name}
              className="aspect-[4/3] w-full object-cover"
            />
            <span className="text-[11px] uppercase tracking-[0.25em] text-mist">Veltra</span>
            <span className="text-2xl font-light tracking-tight text-ink">{car.name}</span>
            <span className="max-w-xs px-4 text-[13px] leading-relaxed text-mist">{TAGLINES[car.id]}</span>
            <span className="text-[13px] text-ink">{car.price}</span>
            <div className="flex-1" />
            <span className="rounded-full border border-ink/20 px-6 py-2.5 text-[12px] text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
              Configurar
            </span>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-20 grid w-full max-w-5xl grid-cols-2 gap-8 border-t border-ink/10 pt-10 text-[13px] text-mist sm:grid-cols-4">
        <div>
          <div className="mb-3 text-ink">Carroceria</div>
          <div>Coupé</div>
        </div>
        <div>
          <div className="mb-3 text-ink">Tração</div>
          <div>Traseira · Integral</div>
        </div>
        <div>
          <div className="mb-3 text-ink">Câmbio</div>
          <div>Automático</div>
        </div>
        <div>
          <div className="mb-3 text-ink">Combustível</div>
          <div>Gasolina</div>
        </div>
      </div>
    </main>
  );
}
