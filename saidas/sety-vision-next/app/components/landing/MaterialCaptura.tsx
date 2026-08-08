"use client";

import { useState } from "react";
import type { LeadMagnet } from "@/lib/lead-magnets";

type MagnetSerializavel = Omit<LeadMagnet, "whatsappMensagem">;

export function MaterialCaptura({ magnet }: { magnet: MagnetSerializavel }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, slug: magnet.slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar");
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <span className="text-[13px] font-bold uppercase tracking-[0.28em] text-[#FF2A2A]">
          {magnet.eyebrow}
        </span>
        <div className="mt-4 h-[4px] w-[70px] bg-[#FF2A2A]" />
        <h1 className="mt-8 text-[38px] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[48px]">
          {magnet.titulo}
        </h1>
        <p className="mt-5 text-[19px] leading-relaxed text-white/70">{magnet.subtitulo}</p>

        {status !== "done" ? (
          <form onSubmit={handleSubmit} className="mt-10 space-y-4 border-t border-white/10 pt-8">
            <p className="text-[15px] font-semibold text-white/90">
              Preenche aqui embaixo pra liberar o material completo e receber no WhatsApp:
            </p>
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-white/15 bg-[#1A1A1A] px-5 py-4 text-[16px] outline-none focus:border-[#FF2A2A]"
            />
            <input
              type="tel"
              placeholder="Seu WhatsApp (com DDD)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-white/15 bg-[#1A1A1A] px-5 py-4 text-[16px] outline-none focus:border-[#FF2A2A]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#FF2A2A] px-5 py-4 text-[16px] font-bold uppercase tracking-wide text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? "Enviando..." : "Quero acessar o material"}
            </button>
            {status === "error" && (
              <p className="text-[14px] text-[#FF2A2A]">{errorMsg} — tenta de novo em instantes.</p>
            )}
          </form>
        ) : (
          <div className="mt-10 space-y-6 border-t border-white/10 pt-8">
            <p className="text-[15px] font-semibold text-[#FF2A2A]">
              Liberado ✓ — e já te mandei uma cópia no WhatsApp também.
            </p>
            {magnet.corpo.map((paragrafo, i) => (
              <p key={i} className="text-[17px] leading-relaxed text-white/80">
                {paragrafo}
              </p>
            ))}
            <div className="border-t border-white/10 pt-8">
              <p className="text-[17px] font-semibold text-white">
                Quer ver isso rodando no seu negócio?
              </p>
              <a
                href={`https://wa.me/?text=${encodeURIComponent("Vi o material sobre " + magnet.titulo + " e quero saber mais")}`}
                className="mt-4 inline-block bg-[#FF2A2A] px-6 py-3 text-[15px] font-bold uppercase tracking-wide text-white hover:opacity-90"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
