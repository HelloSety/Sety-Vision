"use client";

import Reveal from "../ui/Reveal";
import MagneticButton from "../ui/MagneticButton";

export default function FinalScene() {
  return (
    <section id="final" className="relative overflow-hidden bg-ink px-6 py-40 sm:px-10 lg:px-16">
      <div
        className="absolute right-[6%] top-10 h-64 w-64 rounded-full sm:h-[26rem] sm:w-[26rem]"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,246,236,0.95), rgba(224,168,63,0.32) 55%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />
      <div className="noise pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid max-w-6xl gap-16 pt-16 sm:pt-24 lg:grid-cols-[1.3fr_0.7fr] lg:gap-8">
        <Reveal variant="left">
          <p className="max-w-xl font-serif text-4xl italic leading-snug text-white sm:text-6xl">
            &ldquo;A lâmina mais afiada é forjada pela disciplina.&rdquo;
          </p>
          <div className="mt-12">
            <MagneticButton href="contact">Comece seu caminho</MagneticButton>
          </div>
        </Reveal>

        <Reveal variant="right" delay={0.15} className="self-end justify-self-end text-right">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold/80">
            Encerramento
          </span>
          <p className="mt-4 max-w-[16rem] text-sm text-white/60">
            A katana volta à bainha. A disciplina, não.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
