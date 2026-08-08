"use client";

import type { SyntheticEvent } from "react";

// fotos reais do carro de verdade vão em /public/car-photos/{carId}-{shot}.jpg
// (ver public/car-photos/README.md pra convenção completa). Enquanto a foto
// real não existir/falhar, cai pra thumbnail 3D com zoom + posição diferente
// por card — dá uma ilusão razoável de "close-up" sem precisar de arquivo extra.
const FALLBACK_POSITION: Record<string, string> = {
  headlight: "90% 40%",
  wheel: "20% 70%",
  taillight: "10% 40%",
};

export default function DetailGallery({ carId }: { carId: string }) {
  const shots = [
    { file: "headlight", label: "Farol" },
    { file: "wheel", label: "Rodas" },
    { file: "taillight", label: "Lanterna" },
  ];

  const onError = (file: string) => (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `/car-thumbs/${carId}.png`;
    e.currentTarget.style.objectPosition = FALLBACK_POSITION[file];
    e.currentTarget.style.transform = "scale(1.6)";
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10">
      <div className="mb-10 max-w-md">
        <span className="text-[11px] uppercase tracking-[0.25em] text-mist">Detalhes</span>
        <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">Design em cada detalhe</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-mist">
          Linhas atemporais, proporções perfeitas — visto de perto, na estrada.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {shots.map((shot) => (
          <div key={shot.file} className="overflow-hidden rounded-2xl border border-ink/8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/car-photos/${carId}-${shot.file}.jpg`}
              onError={onError(shot.file)}
              alt={shot.label}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="px-4 py-3 text-[12px] uppercase tracking-[0.15em] text-mist">{shot.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
