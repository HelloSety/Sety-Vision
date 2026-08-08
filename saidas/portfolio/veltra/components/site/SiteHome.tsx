"use client";

import Link from "next/link";
import { CAR_MODELS } from "../scene/CarModel";

const CATEGORIES = [
  { name: "Esportivos", thumb: "type-03", desc: "Coupés de alta performance" },
  { name: "SUVs", thumb: "type-04", desc: "Espaço sem abrir mão da velocidade" },
  { name: "Ícones", thumb: "type-09", desc: "Atemporais, sempre relevantes" },
];

const FEATURED = CAR_MODELS[4]; // McLaren Artura Spider

export default function SiteHome() {
  return (
    <main className="min-h-screen w-full bg-paper text-ink">
      <nav className="flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="text-[15px] font-medium tracking-[0.3em]">VELTRA</span>
        <div className="hidden items-center gap-8 text-[13px] text-mist sm:flex">
          <a href="#modelos" className="hover:text-ink">Modelos</a>
          <a href="#contato" className="hover:text-ink">Contato</a>
          <Link href="/" className="hover:text-ink">Estoque 3D</Link>
        </div>
        <Link href="/" className="rounded-full bg-ink px-5 py-2.5 text-[12px] font-medium text-paper">
          Explorar em 3D
        </Link>
      </nav>

      {/* Hero */}
      <section className="grid grid-cols-1 items-center gap-10 px-6 pb-20 pt-10 sm:px-10 lg:grid-cols-2 lg:gap-4">
        <div>
          <h1 className="text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Qualidade,
            <br />
            Precisão,
            <br />
            Exclusividade.
          </h1>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-paper"
          >
            Acessar coleção completa →
          </Link>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/car-thumbs/${FEATURED.id}.png`}
          alt={FEATURED.name}
          className="aspect-[4/3] w-full rounded-3xl object-cover"
        />
      </section>

      {/* Categorias */}
      <section id="modelos" className="px-6 pb-20 sm:px-10">
        <h2 className="mb-8 text-2xl font-light tracking-tight">Modelos</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href="/"
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/car-thumbs/${cat.thumb}.png`}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="relative z-10 p-6 text-paper">
                <div className="text-lg font-medium">{cat.name}</div>
                <div className="text-[12px] text-paper/70">{cat.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Formulário */}
      <section className="px-6 pb-20 sm:px-10">
        <div className="rounded-3xl border border-ink/10 bg-white/60 p-8 sm:p-12">
          <h2 className="text-2xl font-light tracking-tight">Procurando um modelo em específico?</h2>
          <p className="mt-2 max-w-md text-[13px] text-mist">
            Deixe seu contato para que nossa equipe apresente a coleção completa Veltra.
          </p>
          <form className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-4">
            <input placeholder="Modelo" className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[13px] outline-none" />
            <input placeholder="Nome" className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[13px] outline-none" />
            <input placeholder="E-mail" className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[13px] outline-none" />
            <button type="button" className="rounded-xl bg-ink px-4 py-3 text-[13px] font-medium text-paper">
              Enviar
            </button>
          </form>
        </div>
      </section>

      {/* Destaque semanal */}
      <section className="px-6 pb-20 sm:px-10">
        <h2 className="mb-8 text-2xl font-light tracking-tight">Destaque da semana</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/car-thumbs/${FEATURED.id}.png`}
            alt={FEATURED.name}
            className="aspect-[16/10] w-full rounded-3xl object-cover"
          />
          <div className="flex flex-col justify-center rounded-3xl bg-ink p-8 text-paper">
            <div className="text-xl font-medium">{FEATURED.name}</div>
            <p className="mt-3 text-[13px] leading-relaxed text-paper/70">
              O topo da linha Veltra. Presença absoluta, engenharia sem concessões — {FEATURED.price}.
            </p>
            <Link href="/" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-paper/30 px-5 py-2.5 text-[12px]">
              Configurar este modelo →
            </Link>
          </div>
        </div>
      </section>

      {/* Catálogo completo */}
      <section className="px-6 pb-20 sm:px-10">
        <h2 className="mb-8 text-2xl font-light tracking-tight">Nossa coleção</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAR_MODELS.map((car) => (
            <Link key={car.id} href="/" className="group overflow-hidden rounded-2xl border border-ink/8 bg-white/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/car-thumbs/${car.id}.png`}
                alt={car.name}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <div className="text-[14px] font-medium">{car.name}</div>
                <div className="mt-1 text-[12px] text-mist">{car.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="border-t border-ink/10 px-6 py-12 sm:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <span className="text-[15px] font-medium tracking-[0.3em]">VELTRA</span>
            <p className="mt-3 max-w-xs text-[13px] text-mist">Qualidade, precisão, exclusividade.</p>
          </div>
          <div>
            <div className="mb-3 text-[13px] font-medium">Contato</div>
            <div className="text-[13px] text-mist">contato@veltra.com.br</div>
            <div className="text-[13px] text-mist">WhatsApp</div>
          </div>
          <div>
            <div className="mb-3 text-[13px] font-medium">Coleção</div>
            <Link href="/" className="block text-[13px] text-mist hover:text-ink">Explorar em 3D →</Link>
          </div>
        </div>
        <div className="mt-10 border-t border-ink/10 pt-6 text-[12px] text-mist">
          © {new Date().getFullYear()} Veltra. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}
