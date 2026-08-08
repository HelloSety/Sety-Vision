"use client";

import Reveal from "./ui/Reveal";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink px-6 py-28 sm:px-10">
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-pink/15 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink">// Sety Studio</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-black leading-[0.95] tracking-tight text-4xl sm:text-6xl">
            Seu projeto merece <span className="text-gradient">esse nível.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-mist">
            Esse é um site conceito 100% autoral, criado pela Sety Studio pra mostrar até onde a
            gente leva design, 3D e motion de verdade. Cores fortes, objeto 3D interativo, impacto
            real.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex justify-center">
          <a
            data-cursor
            href="https://instagram.com/sety.studio"
            target="_blank"
            rel="noopener"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.12em]"
          >
            <span className="absolute inset-0 bg-linear-to-r from-pink to-violet transition-transform duration-300 group-hover:scale-105" />
            <span className="relative">Falar com a Sety Studio</span>
          </a>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-24 flex max-w-4xl flex-col items-center gap-4 border-t border-line pt-10 text-center">
        <span className="font-black text-lg">
          VOLT<span className="text-gradient">°</span>
        </span>
        <p className="max-w-md text-xs text-mist">
          Site conceito de portfólio — VOLT é uma marca fictícia, não representa um produto real à
          venda.
        </p>
        <p className="max-w-md text-xs text-mist/70">
          Modelo 3D do tênis: “Materials Variants Shoe” por Shopify, Inc. — licença{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/legalcode"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            CC BY 4.0
          </a>
          .
        </p>
        <p className="text-xs text-mist">
          Criado por{" "}
          <a
            href="https://instagram.com/sety.studio"
            target="_blank"
            rel="noopener"
            className="font-bold text-pink"
          >
            Sety Studio
          </a>{" "}
          · 2026
        </p>
      </div>
    </footer>
  );
}
