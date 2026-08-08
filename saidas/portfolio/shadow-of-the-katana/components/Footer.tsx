"use client";

import Reveal from "./ui/Reveal";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink px-6 py-28 sm:px-10">
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-fire/10 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-fire-yellow">
            Sety Studio
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif text-4xl italic leading-[1.02] tracking-tight text-white sm:text-6xl">
            Seu projeto merece <span className="text-gradient">esse nível.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            Site conceito 100% autoral, criado pela Sety Studio pra mostrar até onde a gente leva
            design, 3D e motion de verdade. Katana real em WebGL, cores marcantes, cinema de
            verdade.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex justify-center">
          <a
            data-cursor
            href="https://instagram.com/sety.studio"
            target="_blank"
            rel="noopener"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em]"
          >
            <span className="absolute inset-0 bg-linear-to-r from-fire to-gold transition-transform duration-300 group-hover:scale-105" />
            <span className="relative text-ink">Falar com a Sety Studio</span>
          </a>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-24 flex max-w-4xl flex-col items-center gap-4 border-t border-line pt-10 text-center">
        <span className="font-serif text-lg italic text-white">Shadow of the Katana</span>
        <p className="max-w-md text-xs text-white/50">
          Site conceito de portfólio — não é um produto real à venda, nem afiliado a nenhuma marca
          ou obra existente.
        </p>
        <p className="text-xs text-white/50">
          Criado por{" "}
          <a
            href="https://instagram.com/sety.studio"
            target="_blank"
            rel="noopener"
            className="font-bold text-fire-yellow"
          >
            Sety Studio
          </a>{" "}
          · 2026
        </p>
      </div>
    </footer>
  );
}
