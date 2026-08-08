"use client";

import { useEffect, useState } from "react";
import Reveal from "../ui/Reveal";
import RevealText from "../ui/RevealText";

function Telemetry({
  label,
  base,
  suffix = "",
}: {
  label: string;
  base: number;
  suffix?: string;
}) {
  const [value, setValue] = useState(base);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => Math.max(0, Math.round((v + (Math.random() - 0.5) * 1.4) * 10) / 10));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
      {label} <span className="text-white">{value.toFixed(1)}{suffix}</span>
    </div>
  );
}

export default function FutureHud() {
  return (
    <section id="future" className="relative overflow-hidden bg-ink py-40">
      <div className="grid-overlay absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />

      <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
        <span
          className="absolute inset-x-0 top-0 h-px w-full animate-scan bg-blue/70"
          style={{ animationDuration: "5s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <span className="absolute -top-6 left-2 h-10 w-10 border-l-2 border-t-2 border-blue/50" />
        <span className="absolute -top-6 right-2 h-10 w-10 border-r-2 border-t-2 border-blue/50" />
        <span className="absolute -bottom-6 left-2 h-10 w-10 border-b-2 border-l-2 border-blue/50" />
        <span className="absolute -bottom-6 right-2 h-10 w-10 border-b-2 border-r-2 border-blue/50" />

        <div className="flex flex-col items-center gap-10 text-center">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-blue">
              // System Online
            </span>
          </Reveal>

          <h2 className="font-black uppercase leading-[0.9] tracking-tighter text-[12vw] sm:text-[9vw] lg:text-[6.5vw]">
            <RevealText text="THE NEXT" />
            <br />
            <span className="text-gradient-blue">
              <RevealText text="GENERATION" delay={0.15} />
            </span>
          </h2>

          <Reveal delay={0.3} className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <Telemetry label="Top Speed" base={35.4} suffix=" km/h" />
            <Telemetry label="Accel 0-30" base={4.2} suffix="s" />
            <Telemetry label="Agility Index" base={92.1} />
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">
              Class <span className="text-white">2030</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
