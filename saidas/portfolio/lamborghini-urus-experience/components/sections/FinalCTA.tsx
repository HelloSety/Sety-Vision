"use client";

import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-panel px-6 py-40 sm:px-10 lg:px-16">
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-lime/10 blur-[140px]" />
      <div className="noise pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal variant="scale">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-lime">Sety Studio</span>
          <h2 className="mt-6 font-black italic text-4xl leading-[1.0] tracking-tight text-ink sm:text-6xl">
            Seu projeto merece <span className="text-gradient">esse nível</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-mist">
            Protótipo privado 100% autoral — objeto 3D real, modelado e otimizado via pipeline Blender,
            não geometria genérica. Assim que a questão de licença do asset for resolvida, isso pode
            virar peça pública de portfólio.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="configurator">Configurar meu Urus</MagneticButton>
          <MagneticButton href="hero" variant="ghost">
            Voltar ao topo
          </MagneticButton>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-24 flex max-w-3xl flex-col items-center gap-3 border-t border-line pt-10 text-center">
        <span className="font-black text-lg text-ink">
          URUS<span className="text-gradient">°</span>
        </span>
        <p className="max-w-md text-xs text-mist">
          Protótipo privado — não publicado. Modelo 3D e vídeo de origem incerta (possíveis assets sem
          licença), uso restrito a demonstração interna. Ver <code>ASSET_LICENSE.md</code>.
        </p>
        <p className="text-xs text-mist">Sety Studio · 2026</p>
      </div>
    </section>
  );
}
