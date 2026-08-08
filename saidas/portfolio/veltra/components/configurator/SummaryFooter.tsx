"use client";

export default function SummaryFooter({
  carId,
  modelName,
  colorName,
  wheelName,
  price,
}: {
  carId: string;
  modelName: string;
  colorName: string;
  wheelName: string;
  price: string;
}) {
  return (
    <div className="border-t border-ink/8 px-6 py-16 sm:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 rounded-3xl border border-ink/8 bg-white/60 p-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/car-thumbs/${carId}.png`} alt={modelName} className="h-20 w-32 rounded-xl object-cover" />
          <div>
            <div className="text-[15px] text-ink">Seu {modelName}</div>
            <div className="text-[13px] text-mist">Pintura {colorName}</div>
            <div className="text-[13px] text-mist">Rodas {wheelName}</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="text-center sm:text-right">
            <div className="text-[11px] uppercase tracking-[0.2em] text-mist">Preço total</div>
            <div className="text-xl text-ink">{price}</div>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-paper">
              Solicitar proposta
            </button>
            <button className="rounded-full border border-ink/15 px-6 py-3 text-[13px] text-ink">
              Salvar configuração
            </button>
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-16 w-full max-w-7xl border-t border-ink/8 pt-10 text-[13px] text-mist">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="text-[15px] font-medium tracking-[0.3em] text-ink">VELTRA</span>
          <div className="flex flex-wrap justify-center gap-6">
            <span>Modelos</span>
            <span>Configurar</span>
            <span>Serviços</span>
            <span>Sobre a Veltra</span>
          </div>
        </div>
        <div className="mt-8 text-center text-[12px]">© {new Date().getFullYear()} Veltra. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}
