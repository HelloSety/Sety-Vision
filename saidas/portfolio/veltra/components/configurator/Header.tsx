"use client";

export default function Header({ modelName, onBack }: { modelName: string; onBack: () => void }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10">
        <button className="pointer-events-auto flex flex-col gap-[5px]" aria-label="Menu">
          <span className="h-[1.5px] w-6 bg-ink" />
          <span className="h-[1.5px] w-6 bg-ink" />
          <span className="h-[1.5px] w-6 bg-ink" />
        </button>

        <span className="text-[15px] font-medium tracking-[0.3em] text-ink">VELTRA</span>

        <div className="pointer-events-auto flex items-center gap-3">
          <button
            className="grid h-9 w-9 place-items-center rounded-full bg-ink/5 text-ink"
            aria-label="Conta"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.8-4 5-6 8-6s6.2 2 8 6" />
            </svg>
          </button>
          <button className="rounded-full bg-ink px-5 py-2.5 text-[12px] font-medium text-paper">
            Encontrar concessionária
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[76px] z-30 flex items-center justify-between border-t border-ink/10 px-6 py-4 sm:px-10">
        <button onClick={onBack} className="pointer-events-auto flex items-center gap-2 text-[13px] text-ink">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          Visão geral
        </button>

        <span className="text-2xl font-light tracking-tight text-ink sm:text-3xl">{modelName}</span>

        <button className="pointer-events-auto flex items-center gap-2 text-[13px] text-ink">
          Salvar configuração
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />
          </svg>
        </button>
      </div>
    </>
  );
}
