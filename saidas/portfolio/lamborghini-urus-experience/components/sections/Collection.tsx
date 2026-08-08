"use client";

import Image from "next/image";
import Reveal from "../ui/Reveal";
import { scrollToId } from "@/lib/scroll";

const CARS = [
  {
    name: "Urus Performante",
    image: "/images/urus-card.png",
    stats: [
      { value: "3,3s", label: "0-100" },
      { value: "666cv", label: "Potência" },
      { value: "306km/h", label: "Vmáx" },
    ],
    cta: "Configurar",
    action: () => scrollToId("configurator"),
  },
  {
    name: "911 Turbo S",
    image: "/images/porsche-card.png",
    stats: [
      { value: "2,7s", label: "0-100" },
      { value: "650cv", label: "Potência" },
      { value: "330km/h", label: "Vmáx" },
    ],
    cta: "Em breve",
    action: undefined,
  },
];

export default function Collection() {
  return (
    <section id="collection" className="relative bg-white px-6 py-32 sm:px-10 lg:px-16">
      <Reveal variant="up" className="mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-lime">
          Coleção
        </span>
        <h2 className="font-black italic text-4xl leading-[1.0] tracking-tight text-ink sm:text-5xl">
          Mais peças, mesma obsessão.
        </h2>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
        {CARS.map((car, i) => (
          <Reveal key={car.name} variant="scale" delay={i * 0.12}>
            <div className="group overflow-hidden rounded-3xl border border-line bg-panel">
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="font-black italic text-2xl tracking-tight text-ink">{car.name}</h3>
                <div className="mt-5 flex gap-6">
                  {car.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-black italic text-xl text-ink">{s.value}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-mist">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  data-cursor
                  disabled={!car.action}
                  onClick={car.action}
                  className={`mt-6 inline-flex rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                    car.action
                      ? "bg-ink text-white hover:opacity-90"
                      : "cursor-default bg-transparent text-mist ring-1 ring-line"
                  }`}
                >
                  {car.cta}
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
