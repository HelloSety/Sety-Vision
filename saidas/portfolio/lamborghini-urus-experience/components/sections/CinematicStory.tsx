"use client";

import Reveal from "../ui/Reveal";

export default function CinematicStory() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-ink">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        src="/videos/urus-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
      <div className="noise pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative flex h-full flex-col justify-end px-6 pb-20 sm:px-10 lg:px-16">
        <Reveal variant="up">
          <span className="mb-4 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-lime">
            Dare to live more
          </span>
          <h2 className="max-w-2xl font-black italic text-4xl leading-[1.02] tracking-tight text-white sm:text-6xl">
            Não é sobre chegar. É sobre como você chega.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
