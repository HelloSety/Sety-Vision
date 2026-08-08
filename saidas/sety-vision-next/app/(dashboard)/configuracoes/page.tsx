"use client";

import { Topbar } from "@/app/components/dashboard/Topbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";
import {
  User, Building2, Shield, CreditCard, Bell, Palette,
  Globe, ChevronRight, Check, Save, Eye, EyeOff, Smartphone,
  Mail, Lock, Zap, Brain
} from "lucide-react";

type ModelStatus = {
  id: string; healthy: boolean; lastError: string | null;
  lastErrorAt: number | null; lastSuccessAt: number | null;
  avgLatencyMs: number; totalCalls: number; totalErrors: number;
};
type AiManagerStatus = {
  activeModel: string; primary: string; fallback: string;
  models: ModelStatus[];
  recentSwitches: { at: number; to: string; reason: string }[];
};

function AiModelStatusCard() {
  const [status, setStatus] = useState<AiManagerStatus | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/ai-status");
        if (res.ok) setStatus(await res.json());
      } catch {
        // sem status ainda — nenhuma chamada de IA rodou nesse processo
      }
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!status) {
    return (
      <div className="rounded-2xl p-5 text-[12px] text-[#9CA3AF]" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
        Nenhuma chamada de IA registrada ainda neste processo.
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-5 space-y-4" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">AI Model Manager</div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(34,197,94,0.12)] text-[#16A34A]">
          Ativo: {status.activeModel}
        </span>
      </div>

      {status.models.map(m => (
        <div key={m.id} className="flex items-center justify-between rounded-xl p-3" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.healthy ? "#22C55E" : "#EF4444" }} />
            <div>
              <div className="text-[12.5px] font-semibold text-[#0A0A0A]">
                {m.id} {m.id === status.primary ? "(principal)" : "(fallback)"}
              </div>
              <div className="text-[10.5px] text-[#9CA3AF]">
                {m.healthy ? "saudável" : `indisponível — ${m.lastError}`} · {m.totalCalls} chamadas · {m.totalErrors} erros · ~{m.avgLatencyMs}ms
              </div>
            </div>
          </div>
        </div>
      ))}

      {status.recentSwitches.length > 0 && (
        <div>
          <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Últimas trocas</div>
          <div className="space-y-1.5">
            {status.recentSwitches.slice(0, 5).map((s, i) => (
              <div key={i} className="text-[11.5px] text-[#6B7280]">
                {new Date(s.at).toLocaleTimeString("pt-BR")} → <span className="font-semibold text-[#0A0A0A]">{s.to}</span> ({s.reason})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type Section =
  | "perfil" | "empresa" | "plano" | "seguranca" | "notificacoes"
  | "aparencia" | "integracao" | "ia";

const sections: { id: Section; label: string; icon: typeof User; desc: string }[] = [
  { id: "perfil", label: "Perfil", icon: User, desc: "Nome, email, foto e preferências pessoais" },
  { id: "empresa", label: "Empresa", icon: Building2, desc: "Dados da empresa, logo e endereço" },
  { id: "plano", label: "Plano e Faturamento", icon: CreditCard, desc: "Assinatura, upgrade e histórico" },
  { id: "seguranca", label: "Segurança", icon: Shield, desc: "Senha, 2FA e sessões ativas" },
  { id: "notificacoes", label: "Notificações", icon: Bell, desc: "Email, WhatsApp e push" },
  { id: "aparencia", label: "Aparência", icon: Palette, desc: "Tema, idioma e formato de datas" },
  { id: "integracao", label: "Integrações", icon: Globe, desc: "APIs, webhooks e tokens" },
  { id: "ia", label: "Configurações de IA", icon: Brain, desc: "Modelo, tom e comportamento da IA" },
];

const plans = [
  { id: "start", name: "Start", price: "R$ 97", users: 1, color: "#6B7280" },
  { id: "pro", name: "Pro", price: "R$ 197", users: 3, color: "#7C3AED" },
  { id: "business", name: "Business", price: "R$ 397", users: 10, color: "#3B82F6" },
];

export default function ConfiguracoesPage() {
  const [section, setSection] = useState<Section>("perfil");
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [notifications, setNotifications] = useState({
    venda: true, lead: true, pagamento: true, ia: false,
    email_resumo: true, whatsapp_alertas: true, push: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <Topbar
        title="Configurações"
        subtitle="Personalize sua conta e empresa"
      />

      <main className="flex-1 overflow-hidden flex">

        {/* Left nav */}
        <div className="w-56 flex-shrink-0 border-r border-black/[0.06] p-3 space-y-1 overflow-y-auto">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  section === s.id
                    ? "bg-[rgba(124,58,237,0.12)] text-[#6D28D9]"
                    : "text-[#6B7280] hover:text-[#0A0A0A] hover:bg-black/[0.04]"
                }`}
              >
                <Icon size={14} />
                <span className="text-[13px] font-medium">{s.label}</span>
                {section === s.id && <ChevronRight size={12} className="ml-auto" />}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <motion.div
            key={section}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="max-w-xl space-y-5"
          >

            {section === "perfil" && (
              <>
                <div>
                  <div className="text-[16px] font-bold text-[#0A0A0A] mb-1">Perfil</div>
                  <div className="text-[13px] text-[#6B7280]">Informações pessoais da sua conta</div>
                </div>
                <div className="rounded-2xl p-5 space-y-4" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] flex items-center justify-center text-[22px] font-black text-white">S</div>
                    <div>
                      <div className="text-[13px] font-semibold text-[#0A0A0A] mb-1">Foto de perfil</div>
                      <button className="text-[12px] text-[#6D28D9] hover:text-[#0A0A0A] transition-colors">Alterar foto</button>
                    </div>
                  </div>
                  {[
                    { label: "Nome completo", val: "Seven Santos", type: "text" },
                    { label: "Email", val: "sevendsgnn@gmail.com", type: "email" },
                    { label: "Telefone / WhatsApp", val: "+55 (91) 99999-0000", type: "tel" },
                    { label: "Cargo", val: "CEO & Fundador", type: "text" },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        defaultValue={f.val}
                        className="w-full bg-white border border-black/[0.08] rounded-xl px-4 py-2.5 text-[13px] text-[#0A0A0A] outline-none focus:border-[rgba(124,58,237,0.5)] transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {section === "empresa" && (
              <>
                <div>
                  <div className="text-[16px] font-bold text-[#0A0A0A] mb-1">Empresa</div>
                  <div className="text-[13px] text-[#6B7280]">Dados da sua empresa no sistema</div>
                </div>
                <div className="rounded-2xl p-5 space-y-4" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                  {[
                    { label: "Nome da empresa", val: "Sety Studio" },
                    { label: "CNPJ", val: "00.000.000/0001-00" },
                    { label: "Segmento", val: "Agência Digital" },
                    { label: "Site", val: "https://setystudio.com.br" },
                    { label: "Instagram", val: "@setystudio" },
                    { label: "WhatsApp de atendimento", val: "+55 (91) 99999-0000" },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-1.5">{f.label}</label>
                      <input
                        defaultValue={f.val}
                        className="w-full bg-white border border-black/[0.08] rounded-xl px-4 py-2.5 text-[13px] text-[#0A0A0A] outline-none focus:border-[rgba(124,58,237,0.5)] transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {section === "plano" && (
              <>
                <div>
                  <div className="text-[16px] font-bold text-[#0A0A0A] mb-1">Plano e Faturamento</div>
                  <div className="text-[13px] text-[#6B7280]">Sua assinatura atual e histórico</div>
                </div>
                <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center"><Zap size={16} className="text-white" /></div>
                  <div className="flex-1">
                    <div className="text-[14px] font-bold text-[#0A0A0A]">Plano Pro — R$ 197/mês</div>
                    <div className="text-[12px] text-[#6D28D9]">Próxima cobrança: 27/07/2026 · 3 usuários</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(34,197,94,0.12)] text-[#16A34A]">Ativo</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {plans.map(p => (
                    <div key={p.id} className="rounded-2xl p-4 text-center cursor-pointer hover:border-[rgba(124,58,237,0.4)] transition-all"
                      style={{ background: "#FFFFFF", border: p.id === "pro" ? "2px solid #7C3AED" : "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                      {p.id === "pro" && <div className="text-[9px] font-bold text-[#6D28D9] mb-1">ATUAL</div>}
                      <div className="text-[14px] font-black text-[#0A0A0A]">{p.name}</div>
                      <div className="text-[20px] font-black mt-1" style={{ color: p.color }}>{p.price}</div>
                      <div className="text-[10px] text-[#6B7280] mt-0.5">{p.users} usuário{p.users > 1 ? "s" : ""}</div>
                      <button className="w-full mt-3 py-1.5 rounded-xl text-[11px] font-semibold transition-colors"
                        style={{ background: p.id === "pro" ? "rgba(124,58,237,0.15)" : "rgba(0,0,0,0.06)", color: p.id === "pro" ? "#6D28D9" : "#9CA3AF" }}>
                        {p.id === "pro" ? "Atual" : p.id === "business" ? "Fazer upgrade" : "Fazer downgrade"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {section === "seguranca" && (
              <>
                <div>
                  <div className="text-[16px] font-bold text-[#0A0A0A] mb-1">Segurança</div>
                  <div className="text-[13px] text-[#6B7280]">Proteja sua conta</div>
                </div>
                <div className="rounded-2xl p-5 space-y-4" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                  <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">Alterar senha</div>
                  {["Senha atual", "Nova senha", "Confirmar nova senha"].map(l => (
                    <div key={l} className="relative">
                      <label className="text-[11px] text-[#6B7280] block mb-1.5">{l}</label>
                      <div className="relative">
                        <input type={showPass ? "text" : "password"} placeholder="••••••••"
                          className="w-full bg-white border border-black/[0.08] rounded-xl px-4 py-2.5 pr-10 text-[13px] text-[#0A0A0A] outline-none focus:border-[rgba(124,58,237,0.5)] transition-colors" />
                        <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors">
                          {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl p-5" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[rgba(124,58,237,0.12)] flex items-center justify-center"><Smartphone size={14} className="text-[#6D28D9]" /></div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#0A0A0A]">Autenticação de 2 fatores</div>
                        <div className="text-[11px] text-[#6B7280]">App autenticador ou SMS</div>
                      </div>
                    </div>
                    <button onClick={() => setTwoFA(!twoFA)}
                      className="w-12 h-6 rounded-full transition-all relative"
                      style={{ background: twoFA ? "#7C3AED" : "rgba(0,0,0,0.08)" }}>
                      <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all" style={{ left: twoFA ? "calc(100% - 22px)" : "2px" }} />
                    </button>
                  </div>
                </div>
              </>
            )}

            {section === "notificacoes" && (
              <>
                <div>
                  <div className="text-[16px] font-bold text-[#0A0A0A] mb-1">Notificações</div>
                  <div className="text-[13px] text-[#6B7280]">Escolha o que você quer receber</div>
                </div>
                <div className="rounded-2xl p-5 space-y-4" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                  <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Eventos no app</div>
                  {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val]) => {
                    const labels: Record<string, string> = {
                      venda: "Nova venda realizada", lead: "Novo lead gerado",
                      pagamento: "Pagamento confirmado", ia: "Ações da IA",
                      email_resumo: "Resumo diário por email", whatsapp_alertas: "Alertas no WhatsApp",
                      push: "Notificações push no celular",
                    };
                    return (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-[13px] text-[#9CA3AF]">{labels[key]}</span>
                        <button
                          onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                          className="w-10 h-5 rounded-full transition-all relative"
                          style={{ background: val ? "#7C3AED" : "rgba(0,0,0,0.08)" }}>
                          <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all" style={{ left: val ? "calc(100% - 18px)" : "2px" }} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {section === "aparencia" && (
              <>
                <div>
                  <div className="text-[16px] font-bold text-[#0A0A0A] mb-1">Aparência</div>
                  <div className="text-[13px] text-[#6B7280]">Personalize a interface</div>
                </div>
                <div className="rounded-2xl p-5 space-y-5" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                  <div>
                    <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Tema</div>
                    <div className="flex gap-3">
                      {[
                        { id: "light", label: "Claro", bg: "#FFFFFF", border: "#7C3AED" },
                        { id: "dark", label: "Escuro", bg: "#050505", border: "transparent" },
                      ].map(t => (
                        <div key={t.id} className="flex-1 cursor-pointer">
                          <div className="h-16 rounded-xl mb-2 border-2 transition-all" style={{ background: t.bg, borderColor: t.id === "light" ? t.border : "transparent" }} />
                          <div className="text-[12px] text-center" style={{ color: t.id === "light" ? "#6D28D9" : "#6B7280" }}>{t.label} {t.id === "light" ? "✓" : ""}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Cor de destaque</div>
                    <div className="flex gap-2">
                      {["#7C3AED","#3B82F6","#22C55E","#EF4444","#F59E0B","#EC4899"].map(c => (
                        <button key={c} className="w-7 h-7 rounded-lg border-2 transition-all"
                          style={{ background: c, borderColor: c === "#7C3AED" ? "#0A0A0A" : "transparent" }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Idioma</div>
                    <select className="w-full bg-white border border-black/[0.08] rounded-xl px-4 py-2.5 text-[13px] text-[#0A0A0A] outline-none">
                      <option>Português (Brasil)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {section === "integracao" && (
              <div className="rounded-2xl p-8 flex flex-col items-center gap-4 text-center" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <div className="w-14 h-14 rounded-2xl bg-[rgba(124,58,237,0.12)] flex items-center justify-center">
                  <Globe size={24} className="text-[#6D28D9]" />
                </div>
                <div>
                  <div className="text-[15px] font-bold text-[#0A0A0A] mb-1">Gerenciar Integrações</div>
                  <div className="text-[13px] text-[#6B7280]">Acesse a Central de Integrações para gerenciar todas as conexões</div>
                </div>
                <a href="/integracoes"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white text-[13px] font-semibold rounded-xl hover:bg-[#8B5CF6] transition-colors">
                  Ir para Integrações
                </a>
              </div>
            )}

            {section === "ia" && (
              <>
                <div>
                  <div className="text-[16px] font-bold text-[#0A0A0A] mb-1">Configurações de IA</div>
                  <div className="text-[13px] text-[#6B7280]">Fable 5 é o modelo principal; Opus 4.8 assume automaticamente em caso de falha</div>
                </div>
                <AiModelStatusCard />
              </>
            )}

            {/* Save button */}
            {!["integracao", "ia", "plano"].includes(section) && (
              <button onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                style={{ background: saved ? "rgba(34,197,94,0.15)" : "#7C3AED", color: saved ? "#16A34A" : "white" }}>
                {saved ? <><Check size={14} /> Salvo!</> : <><Save size={14} /> Salvar alterações</>}
              </button>
            )}

          </motion.div>
        </div>
      </main>
    </>
  );
}
