"use client";

import type { SyntheticEvent } from "react";

export default function InteriorShowcase({ carId }: { carId: string }) {
  // foto real do interior vai em /public/car-photos/{carId}-interior.jpg
  // (ver public/car-photos/README.md). Fallback pra thumbnail 3D se a foto
  // não existir/falhar — evita ícone de imagem quebrada em produção.
  const onError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `/car-thumbs/${carId}.png`;
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-0 sm:grid-cols-[1.4fr_1fr]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/car-photos/${carId}-interior.jpg`}
        onError={onError}
        alt="Interior"
        className="aspect-[3/2] w-full object-cover"
      />
      <div className="px-8 py-10 sm:px-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-mist">Interior</span>
        <h2 className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
          Foco no motorista.
          <br />
          Puro Veltra.
        </h2>
        <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-mist">
          Cada detalhe do habitáculo foi pensado para colocar você no centro de tudo — esportivo, intuitivo e
          feito para proporcionar a melhor experiência de condução possível.
        </p>
      </div>
    </div>
  );
}
