"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import GarageMenu from "../GarageMenu";
import type { CarSpec } from "../scene/CarStage";
import type { UrusRefs } from "../scene/UrusModel";
import type { Bounds } from "../scene/LamborghiniScene";

const GarageScene = dynamic(() => import("../scene/GarageScene"), {
  ssr: false,
  loading: () => null,
});

const CARS: CarSpec[] = [
  { name: "Urus Performante", url: "/models/urus.glb" },
  { name: "911 Turbo S", url: "/models/porsche-911.glb" },
];

const STATS: Record<string, { value: string; label: string }[]> = {
  "Urus Performante": [
    { value: "3,3s", label: "0-100" },
    { value: "666cv", label: "Potência" },
    { value: "306km/h", label: "Vmáx" },
  ],
  "911 Turbo S": [
    { value: "2,7s", label: "0-100" },
    { value: "650cv", label: "Potência" },
    { value: "330km/h", label: "Vmáx" },
  ],
};

const PAINT_COLORS: { name: string; hex: string }[] = [
  { name: "Giallo Auge", hex: "#e8c400" },
  { name: "Verde Citrea", hex: "#8bd400" },
  { name: "Nero Noctis", hex: "#0a0a0a" },
  { name: "Bianco Monocerus", hex: "#e9e9e6" },
  { name: "Rosso Efesto", hex: "#a3140f" },
];

export default function GarageHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [configuring, setConfiguring] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const zoomRef = useRef(0);
  const boundsCache = useRef<(Bounds | null)[]>(CARS.map(() => null));
  const carRefs = useRef<React.RefObject<UrusRefs>[]>(
    CARS.map(() => ({ current: { paintMaterial: null } }))
  );

  const activeCar = CARS[activeIndex];

  const selectCar = (i: number) => {
    setActiveIndex(i);
    setConfiguring(false);
    zoomRef.current = 0;
  };

  const toggleConfigure = () => {
    setConfiguring((v) => {
      zoomRef.current = v ? 0 : 1;
      return !v;
    });
  };

  const applyColor = (i: number) => {
    setActiveColor(i);
    const mat = carRefs.current[activeIndex].current.paintMaterial;
    if (mat) {
      mat.color.set(new THREE.Color(PAINT_COLORS[i].hex));
      mat.needsUpdate = true;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#08080a]">
      <div className="absolute inset-0">
        <GarageScene
          cars={CARS}
          activeIndex={activeIndex}
          carRefs={carRefs.current}
          zoomRef={zoomRef}
          onCarBounds={(i, b) => {
            boundsCache.current[i] = b;
          }}
        />
      </div>

      <div className="noise pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="font-black text-lg tracking-tight text-white">
          URUS<span className="text-gradient-light">°</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          Garagem privada — Sety Studio
        </span>
      </div>

      <div
        className={`absolute inset-x-0 top-24 flex flex-col items-center text-center transition-opacity duration-300 ${
          configuring ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
          Lamborghini
        </span>
        <h1 className="font-black italic uppercase leading-[0.9] tracking-tight text-white text-5xl sm:text-6xl">
          {activeCar.name}
        </h1>
        <div className="mt-6 flex gap-8">
          {STATS[activeCar.name]?.map((s) => (
            <div key={s.label}>
              <div className="font-black italic text-xl text-white">{s.value}</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-white/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <button
          data-cursor
          onClick={toggleConfigure}
          className={`mt-8 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition-transform hover:scale-105 ${
            configuring ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          Configurar
        </button>
      </div>

      <div
        className={`absolute inset-x-0 top-8 flex flex-col items-center transition-opacity duration-300 ${
          configuring ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          data-cursor
          onClick={toggleConfigure}
          className={`mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white ${
            configuring ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          ← Voltar à garagem
        </button>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-lime">
          Pintura
        </span>
        <div className="mt-5 flex gap-4 rounded-2xl border border-white/10 bg-black/50 px-6 py-4 backdrop-blur-xl">
          {PAINT_COLORS.map((c, i) => (
            <button
              key={c.name}
              data-cursor
              onClick={() => applyColor(i)}
              className={`group flex flex-col items-center gap-2 ${
                configuring ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <span
                className="h-9 w-9 rounded-full border-2 shadow-sm transition-transform group-hover:scale-110"
                style={{
                  background: c.hex,
                  borderColor: activeColor === i ? "#ffffff" : "rgba(255,255,255,0.2)",
                }}
              />
              <span
                className={`font-mono text-[9px] uppercase tracking-widest ${
                  activeColor === i ? "text-white" : "text-white/40"
                }`}
              >
                {c.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <GarageMenu cars={CARS} activeIndex={activeIndex} onSelect={selectCar} />
    </section>
  );
}
