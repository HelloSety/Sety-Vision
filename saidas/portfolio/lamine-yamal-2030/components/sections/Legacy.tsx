"use client";

import Reveal from "../ui/Reveal";
import RevealText from "../ui/RevealText";

export default function Legacy() {
  return (
    <section
      id="legacy"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 py-32"
    >
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-orange/10 blur-[160px]" />
      <div className="noise absolute inset-0" />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="mb-10 inline-block font-mono text-xs uppercase tracking-[0.3em] text-mist">
            // Legacy
          </span>
        </Reveal>
        <p className="font-black leading-[1.05] tracking-tight text-[9vw] sm:text-[6vw] lg:text-[4.5vw]">
          <RevealText text="Greatness isn't inherited." />
          <br />
          <span className="text-gradient">
            <RevealText text="It's created." delay={0.2} />
          </span>
        </p>
      </div>
    </section>
  );
}
