"use client";

export type SwatchItem = { name: string; hex?: string };

export default function SwatchPanel({
  items,
  active,
  onPick,
}: {
  items: SwatchItem[];
  active: number;
  onPick: (index: number) => void;
}) {
  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-[136px] z-20 flex justify-center px-6">
      <div className="flex max-w-full items-center gap-5 overflow-x-auto rounded-2xl border border-ink/10 bg-white/85 px-6 py-4 backdrop-blur">
        {items.map((s, i) => (
          <button key={s.name} onClick={() => onPick(i)} className="flex flex-shrink-0 flex-col items-center gap-2">
            <span
              className="h-8 w-8 rounded-full border-2 shadow-sm transition-transform hover:scale-110"
              style={{
                background: s.hex ?? "linear-gradient(135deg, #d8d8d6, #8b8b88)",
                borderColor: active === i ? "var(--color-ink)" : "rgba(10,10,10,0.15)",
              }}
            />
            <span className={`whitespace-nowrap text-[10px] ${active === i ? "text-ink" : "text-mist"}`}>{s.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
