"use client";

export default function ViewArrows({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const base =
    "pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-paper";
  return (
    <>
      <button onClick={onPrev} aria-label="Vista anterior" className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 sm:left-8 ${base}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button onClick={onNext} aria-label="Próxima vista" className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 sm:right-8 ${base}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </>
  );
}
