"use client";

import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import {
  FiArrowUpRight,
  FiInstagram,
  FiMessageCircle,
} from "react-icons/fi";
import { SiBehance } from "react-icons/si";

const ease = [0.16, 1, 0.3, 1] as const;

function CardShell({
  eyebrow,
  title,
  desc,
  visual,
  className = "",
}: {
  eyebrow: string;
  title: string;
  desc: string;
  visual: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex h-full flex-col justify-between p-7 ${className}`}>
      <div className="relative mb-8 h-40 w-full">{visual}</div>
      <div>
        <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-text-faint">
          {eyebrow}
        </div>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-2xl font-medium">{title}</h3>
          <FiArrowUpRight className="h-5 w-5 flex-shrink-0 text-text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-text-soft">{desc}</p>
      </div>
    </div>
  );
}

function MacbookMockup() {
  return (
    <div className="flex h-full items-end justify-center">
      <div className="w-full max-w-[220px] rounded-t-lg border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-2">
        <div className="space-y-1.5 rounded-md bg-surface p-2.5">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="aspect-square rounded bg-accent/25" />
            <div className="aspect-square rounded bg-white/10" />
            <div className="aspect-square rounded bg-white/10" />
          </div>
          <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
        </div>
        <div className="h-1.5 rounded-b-md bg-white/[0.08]" />
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-40 w-24 flex-col gap-1.5 rounded-2xl border border-white/12 bg-surface p-2 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.3)]">
        <div className="ml-auto max-w-[70%] rounded-lg rounded-tr-sm bg-white/10 px-2 py-1 text-[8px] text-text-soft">
          Olá! Quero um site premium
        </div>
        <div className="mr-auto max-w-[70%] rounded-lg rounded-tl-sm bg-accent/80 px-2 py-1 text-[8px] text-white">
          Vamos criar algo incrível 🚀
        </div>
        <div className="mt-auto flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-1">
          <FiMessageCircle className="h-2.5 w-2.5 text-accent" />
          <span className="h-1 flex-1 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function InstagramMockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-accent to-white/20 p-[2px]">
        <div className="grid h-full w-full place-items-center rounded-full bg-surface">
          <FiInstagram className="h-6 w-6" />
        </div>
      </div>
      <div className="grid w-full grid-cols-3 gap-1.5">
        <div className="aspect-square rounded-md bg-white/[0.08]" />
        <div className="aspect-square rounded-md bg-accent/20" />
        <div className="aspect-square rounded-md bg-white/[0.08]" />
      </div>
    </div>
  );
}

function BehanceMockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <SiBehance className="h-10 w-10 text-text-soft" />
      <div className="grid w-full grid-cols-2 gap-2">
        <div className="aspect-[4/3] rounded-md bg-gradient-to-br from-white/10 to-transparent" />
        <div className="aspect-[4/3] rounded-md bg-gradient-to-br from-accent/25 to-transparent" />
      </div>
    </div>
  );
}

function ServicesMockup() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-[200px] space-y-2 rounded-lg border border-white/10 bg-surface p-3">
        <div className="h-1.5 w-1/3 rounded-full bg-accent/50" />
        <div className="h-14 rounded-md bg-gradient-to-tr from-accent/15 via-white/[0.04] to-transparent" />
        <div className="flex gap-1.5">
          <div className="h-1.5 flex-1 rounded-full bg-white/10" />
          <div className="h-1.5 w-6 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

function BrandingMockup() {
  return (
    <div className="flex h-full items-center justify-center gap-3">
      <div className="flex h-28 w-20 flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface">
        <span className="font-display text-lg font-medium">S</span>
        <div className="h-px w-8 bg-white/15" />
        <div className="h-1 w-6 rounded-full bg-accent/50" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="h-6 w-6 rounded-full bg-white" />
        <span className="h-6 w-6 rounded-full bg-accent" />
        <span className="h-6 w-6 rounded-full border border-white/20" />
      </div>
    </div>
  );
}

const CARDS = [
  {
    eyebrow: "Trabalhos",
    title: "Portfólio",
    desc: "Projetos reais, resultados reais.",
    visual: <MacbookMockup />,
    href: "#portfolio",
    span: "lg:col-span-2",
  },
  {
    eyebrow: "Vamos conversar",
    title: "Orçamento",
    desc: "Fale agora pelo WhatsApp.",
    visual: <PhoneMockup />,
    href: "https://wa.me/5500000000000",
    span: "",
  },
  {
    eyebrow: "Bastidores",
    title: "Instagram",
    desc: "@sety.studio",
    visual: <InstagramMockup />,
    href: "https://www.instagram.com/sety.studio/",
    span: "",
  },
  {
    eyebrow: "Cases",
    title: "Behance",
    desc: "Portfólio completo de design e branding.",
    visual: <BehanceMockup />,
    href: "https://www.behance.net/setystudio",
    span: "",
  },
  {
    eyebrow: "O que fazemos",
    title: "Serviços",
    desc: "Sites, branding e experiências sob medida.",
    visual: <ServicesMockup />,
    href: "#servicos",
    span: "",
  },
  {
    eyebrow: "Identidade",
    title: "Branding",
    desc: "Marcas com presença e propósito.",
    visual: <BrandingMockup />,
    href: "#servicos",
    span: "",
  },
];

export default function LinkCards() {
  return (
    <section id="portfolio" className="relative px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-14"
        >
          <span className="text-[12px] uppercase tracking-[0.3em] text-text-faint">Explore</span>
          <h2 className="font-display mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            Tudo em um lugar
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
              className={card.span}
            >
              <TiltCard href={card.href} className="h-full min-h-[300px]">
                <CardShell
                  eyebrow={card.eyebrow}
                  title={card.title}
                  desc={card.desc}
                  visual={card.visual}
                />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
