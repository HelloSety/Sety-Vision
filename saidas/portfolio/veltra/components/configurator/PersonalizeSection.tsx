"use client";

import { useState } from "react";
import { PAINT_SWATCHES, WHEEL_SWATCHES, FINISH_SWATCHES } from "../scene/CarModel";

type Tab = "Cores" | "Rodas" | "Materiais";
const TABS: Tab[] = ["Cores", "Rodas", "Materiais"];

export default function PersonalizeSection({
  modelName,
  activeColor,
  activeWheel,
  activeFinish,
  onPickColor,
  onPickWheel,
  onPickFinish,
}: {
  modelName: string;
  activeColor: number;
  activeWheel: number;
  activeFinish: number;
  onPickColor: (i: number) => void;
  onPickWheel: (i: number) => void;
  onPickFinish: (i: number) => void;
}) {
  const [tab, setTab] = useState<Tab>("Cores");

  const items = tab === "Cores" ? PAINT_SWATCHES : tab === "Rodas" ? WHEEL_SWATCHES : FINISH_SWATCHES;
  const active = tab === "Cores" ? activeColor : tab === "Rodas" ? activeWheel : activeFinish;
  const onPick = tab === "Cores" ? onPickColor : tab === "Rodas" ? onPickWheel : onPickFinish;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10">
      <h2 className="text-center text-3xl font-light tracking-tight text-ink sm:text-4xl">
        Personalize o seu {modelName}
      </h2>

      <div className="mx-auto mt-8 flex w-fit gap-8 border-b border-ink/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 pb-3 text-[13px] transition-colors ${
              tab === t ? "border-ink text-ink" : "border-transparent text-mist hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-8 rounded-3xl border border-ink/8 bg-white/60 p-8 sm:grid-cols-[1fr_2fr]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-mist">{tab}</div>
          <div className="mt-2 text-xl font-light text-ink">{items[active].name}</div>
        </div>
        <div className="flex flex-wrap gap-5">
          {items.map((item, i) => (
            <button key={item.name} onClick={() => onPick(i)} className="flex flex-col items-center gap-2">
              <span
                className="h-10 w-10 rounded-full border-2 shadow-sm transition-transform hover:scale-110"
                style={{
                  background: "hex" in item ? item.hex : "linear-gradient(135deg, #d8d8d6, #8b8b88)",
                  borderColor: active === i ? "var(--color-ink)" : "rgba(10,10,10,0.15)",
                }}
              />
              <span className={`text-[10px] ${active === i ? "text-ink" : "text-mist"}`}>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
