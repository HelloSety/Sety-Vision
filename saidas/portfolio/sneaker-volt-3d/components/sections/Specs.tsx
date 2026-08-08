"use client";

import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";

const SPECS = [
  {
    n: "01",
    title: "Solado reativo",
    desc: "Espuma de alta compressão que devolve energia a cada passo — leveza sem abrir mão de impacto.",
  },
  {
    n: "02",
    title: "Malha adaptativa",
    desc: "Tecido que se molda ao pé em segundos, com ventilação nas zonas de maior atrito.",
  },
  {
    n: "03",
    title: "Grip multidirecional",
    desc: "Padrão de solado pensado pra resposta rápida em qualquer piso — asfalto, quadra ou pista.",
  },
  {
    n: "04",
    title: "3 colorways",
    desc: "Noir, Street e Solar — troque a cor em tempo real e leve pro grid antes de todo mundo.",
  },
];

export default function Specs() {
  return (
    <section id="specs" className="relative bg-ink px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Tecnologia" title="Feito pra virar." />

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {SPECS.map((spec, i) => (
            <Reveal key={spec.n} variant="up" delay={i * 0.08}>
              <TiltCard className="glass h-full rounded-3xl p-8">
                <span className="font-mono text-5xl font-black text-white/10">{spec.n}</span>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{spec.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{spec.desc}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
