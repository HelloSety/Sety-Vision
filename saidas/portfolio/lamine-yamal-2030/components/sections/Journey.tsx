"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "La Masia",
    text: "Entra nas categorias de base do FC Barcelona ainda criança — o início de tudo.",
  },
  {
    year: "Abril 2023",
    text: "Estreia profissional pelo Barcelona e se torna o mais jovem da história do clube na La Liga.",
  },
  {
    year: "2023/24",
    text: "Vira titular absoluto e peça decisiva na temporada que devolve o Barcelona ao topo do futebol europeu.",
  },
  {
    year: "Euro 2024",
    text: "Melhor Jovem do torneio e campeão europeu pela Espanha, com apenas 16 anos.",
  },
  {
    year: "2026",
    text: "Consolidado como uma das maiores referências do futebol mundial, rumo à Copa do Mundo.",
  },
];

export default function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        }
      );
    }, trackRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative bg-ink px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Journey" title="Uma ascensão fora da curva" />

        <div ref={trackRef} className="relative mt-20">
          <div className="absolute left-3 top-0 h-full w-px bg-white/10" />
          <div
            ref={lineRef}
            className="absolute left-3 top-0 h-full w-px origin-top bg-linear-to-b from-orange via-red to-blue"
          />

          <div className="flex flex-col gap-14">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="grid grid-cols-[24px_1fr] items-start gap-6 sm:gap-10">
                <div className="flex justify-center pt-2">
                  <span className="h-3 w-3 rounded-full border-2 border-orange bg-ink" />
                </div>
                <Reveal variant={i % 2 === 0 ? "left" : "right"} delay={0.05}>
                  <div className="font-mono text-sm uppercase tracking-[0.2em] text-orange">
                    {m.year}
                  </div>
                  <p className="mt-3 max-w-xl text-lg text-mist sm:text-xl">{m.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
