"use client";

import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const PRINCIPLES = [
  { n: "01", kanji: "義", word: "Justice", desc: "Decidir o que é certo sem hesitar diante da dificuldade." },
  { n: "02", kanji: "勇", word: "Courage", desc: "Agir mesmo quando o medo é a resposta mais fácil." },
  { n: "03", kanji: "仁", word: "Compassion", desc: "Força que protege, nunca força que oprime." },
  { n: "04", kanji: "礼", word: "Respect", desc: "Cortesia verdadeira, não performance de educação." },
  { n: "05", kanji: "誠", word: "Integrity", desc: "A palavra vale mais que qualquer contrato." },
  { n: "06", kanji: "名誉", word: "Honor", desc: "O nome que você carrega pesa mais que a vitória." },
  { n: "07", kanji: "忠義", word: "Loyalty", desc: "Compromisso que não muda quando ninguém está olhando." },
  { n: "08", kanji: "自制", word: "Self-Control", desc: "A lâmina mais afiada é a que sabe quando não cortar." },
];

export default function Bushido() {
  return (
    <section id="bushido" className="relative bg-ink">
      <div className="px-6 pb-16 pt-32 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Bushido" title="O código do guerreiro" />
        </div>
      </div>

      {PRINCIPLES.map((p, i) => {
        const alignRight = i % 2 === 1;
        return (
          <div
            key={p.n}
            className={`relative flex min-h-[62vh] items-center overflow-hidden border-t border-line px-6 sm:px-10 lg:px-16 ${
              i % 3 === 1 ? "bg-charcoal/40" : ""
            }`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute select-none font-serif text-[38vw] leading-none text-white/5 sm:text-[26vw] ${
                alignRight ? "-right-[4vw]" : "-left-[4vw]"
              }`}
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              {p.kanji}
            </span>

            <div className={`relative mx-auto flex w-full max-w-5xl ${alignRight ? "justify-end" : "justify-start"}`}>
              <Reveal variant={alignRight ? "right" : "left"} className={`max-w-md ${alignRight ? "text-right" : "text-left"}`}>
                <span className="font-mono text-xs text-gold/80">{p.n} / 08</span>
                <h3 className="mt-3 font-serif text-5xl italic tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {p.word}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">{p.desc}</p>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
