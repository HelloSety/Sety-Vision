"use client";

import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import AnimatedCounter from "../ui/AnimatedCounter";
import RadarChart from "../ui/RadarChart";
import ProgressRing from "../ui/ProgressRing";

const COUNTERS = [
  { label: "Goals", value: 28 },
  { label: "Assists", value: 34 },
  { label: "Matches", value: 112 },
  { label: "Dribbles / 90", value: 5.4, decimals: 1 },
];

const RADAR_AXES = [
  { label: "Pace", value: 96 },
  { label: "Dribbling", value: 94 },
  { label: "Finishing", value: 82 },
  { label: "Passing", value: 85 },
  { label: "Vision", value: 88 },
  { label: "Physical", value: 68 },
];

const RINGS = [
  { label: "Pass Accuracy", value: 87, color: "#ff5a1f" },
  { label: "Dribble Success", value: 71, color: "#ff2a3d" },
  { label: "Shot Accuracy", value: 58, color: "#3b82f6" },
];

export default function Stats() {
  return (
    <section id="stats" className="relative bg-ink px-6 py-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Stats" title="Dashboard de performance" />
          <Reveal delay={0.2}>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              Dashboard ilustrativo · dados de exemplo
            </span>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {COUNTERS.map((c, i) => (
            <Reveal key={c.label} variant="scale" delay={i * 0.08} className="bg-panel p-8">
              <div className="font-black text-4xl text-gradient sm:text-5xl">
                <AnimatedCounter value={c.value} decimals={c.decimals ?? 0} />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                {c.label}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal variant="scale" className="glass flex flex-col items-center rounded-3xl p-8 sm:p-12">
            <span className="mb-6 self-start font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              Player Attributes
            </span>
            <RadarChart axes={RADAR_AXES} size={320} />
          </Reveal>

          <Reveal variant="scale" delay={0.1} className="glass flex flex-col justify-center rounded-3xl p-8 sm:p-12">
            <span className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              Efficiency
            </span>
            <div className="flex flex-wrap justify-around gap-8">
              {RINGS.map((r) => (
                <ProgressRing key={r.label} value={r.value} label={r.label} color={r.color} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
