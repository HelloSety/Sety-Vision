"use client";

import { Topbar } from "@/app/components/dashboard/Topbar";
import { Modal } from "@/app/components/ui/Modal";
import { useToast } from "@/app/components/ui/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import { Search, Phone, MessageSquare, Mail, MoreHorizontal, Star, Plus, X, User, Building2, DollarSign, Tag, Trash2, Edit, Users } from "lucide-react";
import { EmptyState } from "@/app/components/dashboard/shared/EmptyState";
import { SkeletonRows } from "@/app/components/dashboard/shared/Skeleton";
import { Avatar } from "@/app/components/dashboard/shared/Avatar";
import { StatusBadge } from "@/app/components/dashboard/shared/StatusBadge";
import { ScoreMeter } from "@/app/components/dashboard/shared/ScoreMeter";
import { dashPremium } from "@/lib/tokens";

type Stage = "Todos" | "Novo" | "Contato" | "Qualificado" | "Proposta" | "Fechamento" | "Ganho" | "Perdido";
const stages: Stage[] = ["Todos","Novo","Contato","Qualificado","Proposta","Fechamento","Ganho","Perdido"];

type Contact = {
  id: string; name: string; company: string; phone: string; email: string;
  stage: string; val: string; score: number; hot: boolean; avatar: string; grad: string;
  tags?: string[];
};

type LeadRow = {
  id: string; name: string; phone: string; email: string | null; city: string | null;
  status: string; temperature: string; score: number; tags: string[] | null; avatar: string | null;
};

const dbToUiStage: Record<string, string> = {
  novo: "Novo", contato: "Contato", qualificado: "Qualificado",
  proposta: "Proposta", negociacao: "Fechamento", fechado: "Ganho", perdido: "Perdido",
};
const uiToDbStage: Record<string, string> = {
  Novo: "novo", Contato: "contato", Qualificado: "qualificado",
  Proposta: "proposta", Fechamento: "negociacao", Ganho: "fechado", Perdido: "perdido",
};
const GRADS = [
  "from-[#7C3AED] to-[#EC4899]", "from-[#3B82F6] to-[#7C3AED]", "from-[#059669] to-[#0891B2]",
  "from-[#D97706] to-[#DC2626]", "from-[#7C3AED] to-[#0891B2]", "from-[#6B7280] to-[#374151]",
];
function gradFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return GRADS[h % GRADS.length];
}
function leadToContact(l: LeadRow): Contact {
  return {
    id: l.id, name: l.name, company: l.city || "—",
    phone: l.phone.startsWith("manual-") ? "" : l.phone,
    email: l.email || "", stage: dbToUiStage[l.status] ?? "Novo",
    val: "—", score: l.score, hot: l.temperature === "hot",
    avatar: l.avatar || l.name.slice(0, 1).toUpperCase(), grad: gradFor(l.id),
    tags: l.tags ?? [],
  };
}

const stageColors: Record<string, { dot: string; text: string; bg: string }> = {
  "Novo":        { dot: "#A1A1AA", text: "#52525B", bg: "rgba(113,113,122,0.07)" },
  "Contato":     { dot: "#3B82F6", text: "#1D4ED8", bg: "rgba(59,130,246,0.07)" },
  "Qualificado": { dot: "#8B5CF6", text: "#6D28D9", bg: "rgba(124,58,237,0.07)" },
  "Proposta":    { dot: "#F59E0B", text: "#B45309", bg: "rgba(245,158,11,0.09)" },
  "Fechamento":  { dot: "#22C55E", text: "#15803D", bg: "rgba(34,197,94,0.08)" },
  "Ganho":       { dot: "#16A34A", text: "#15803D", bg: "rgba(34,197,94,0.13)" },
  "Perdido":     { dot: "#EF4444", text: "#B91C1C", bg: "rgba(239,68,68,0.07)" },
};

const scoreColor = (s: number) => s >= 80 ? "#22C55E" : s >= 50 ? "#F59E0B" : "#EF4444";

export default function CrmPage() {
  const { success, info, warning, error: toastError } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState<Stage>("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [newModal, setNewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Contact | null>(null);
  const [editStageModal, setEditStageModal] = useState<Contact | null>(null);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", val: "", stage: "Novo", tags: "" });
  const [loading, setLoading] = useState(true);
  const skipNextPoll = useRef(false);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) return;
      const { leads } = await res.json();
      if (skipNextPoll.current) { skipNextPoll.current = false; return; }
      setContacts((leads as LeadRow[]).map(leadToContact));
    } catch {
      // rede instável — mantém os dados já carregados
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 4000);
    return () => clearInterval(interval);
  }, []);

  const visible = contacts.filter(c =>
    (filter === "Todos" || c.stage === filter) &&
    (search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()))
  );

  const addContact = async () => {
    if (!form.name.trim()) { toastError("Nome obrigatório", "Preencha o nome do contato"); return; }
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          status: uiToDbStage[form.stage] ?? "novo",
          tags: form.tags ? form.tags.split(",").map(t => t.trim()) : [],
        }),
      });
      if (!res.ok) throw new Error();
      const { lead } = await res.json();
      skipNextPoll.current = true;
      setContacts(prev => [leadToContact(lead), ...prev]);
      setNewModal(false);
      setForm({ name: "", company: "", phone: "", email: "", val: "", stage: "Novo", tags: "" });
      success("Lead criado!", `${lead.name} adicionado ao CRM`);
    } catch {
      toastError("Erro ao criar lead", "Tente novamente");
    }
  };

  const deleteContact = async (c: Contact) => {
    setDeleteModal(null);
    setSelected(null);
    skipNextPoll.current = true;
    setContacts(prev => prev.filter(x => x.id !== c.id));
    try {
      await fetch(`/api/leads/${c.id}`, { method: "DELETE" });
      warning("Contato removido", `${c.name} foi removido do CRM`);
    } catch {
      toastError("Erro ao remover", "Tente novamente");
    }
  };

  const changeStage = async (contact: Contact, stage: string) => {
    setEditStageModal(null);
    skipNextPoll.current = true;
    setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, stage } : c));
    setSelected(prev => prev ? { ...prev, stage } : null);
    try {
      await fetch(`/api/leads/${contact.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: uiToDbStage[stage] ?? "novo" }),
      });
      success("Estágio atualizado!", `${contact.name} → ${stage}`);
    } catch {
      toastError("Erro ao atualizar", "Tente novamente");
    }
  };

  const toggleHot = async (c: Contact) => {
    skipNextPoll.current = true;
    setContacts(prev => prev.map(x => x.id === c.id ? { ...x, hot: !x.hot } : x));
    setSelected(prev => prev && prev.id === c.id ? { ...prev, hot: !prev.hot } : prev);
    try {
      await fetch(`/api/leads/${c.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hot: !c.hot }),
      });
      info(c.hot ? "Removido dos favoritos" : "Marcado como quente!", c.name);
    } catch {
      toastError("Erro ao atualizar", "Tente novamente");
    }
  };

  return (
    <>
      <Topbar title="CRM / Clientes" subtitle={`${contacts.length} contatos · ${contacts.filter(c => c.hot).length} oportunidades quentes`} action={{ label: "Novo lead", onClick: () => setNewModal(true) }} />

      <main className="flex-1 overflow-y-auto p-6 space-y-4">

        {/* Search + filter row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input type="text" placeholder="Buscar por nome ou empresa..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-[10px] pl-9 pr-4 py-2 text-[13px] text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all focus:border-[rgba(124,58,237,0.45)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)]"
              style={{ background: "#FFFFFF", border: `1px solid ${dashPremium.cardBorder}`, boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }} />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]">
                <X size={12} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-[3px] rounded-[10px] p-[3px]" style={{ background: dashPremium.segBg }}>
            {stages.map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className="px-2.5 py-[5px] rounded-[7px] text-[11.5px] cursor-pointer transition-all"
                style={filter === s
                  ? { background: "#FFFFFF", color: "#0F172A", fontWeight: 600, boxShadow: dashPremium.segActiveShadow }
                  : { background: "transparent", color: "#64748B", fontWeight: 500 }}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => setNewModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#111111] text-white text-[12px] font-semibold rounded-[10px] hover:bg-black transition-colors flex-shrink-0"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.2), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
            <Plus size={13} /> Novo lead
          </button>
        </div>

        {/* Contact list */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#FFFFFF", border: `1px solid ${dashPremium.cardBorder}`, boxShadow: dashPremium.cardShadow }}>
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: `1px solid ${dashPremium.rowBorder}` }}>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-[#0F172A]">Contatos</span>
              <span className="text-[10.5px] font-semibold px-1.5 py-0.5 rounded-md tabular-nums" style={{ background: "rgba(15,23,42,0.05)", color: "#64748B" }}>{visible.length}</span>
            </div>
            {filter !== "Todos" && (
              <button onClick={() => setFilter("Todos")} className="text-[11px] font-medium text-[#94A3B8] hover:text-[#0F172A] transition-colors">
                Limpar filtro
              </button>
            )}
          </div>
          <div className="hidden lg:grid grid-cols-[2.5fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-2.5" style={{ background: dashPremium.tableHeadBg, borderBottom: `1px solid ${dashPremium.rowBorder}` }}>
            {["Contato","Empresa","Valor","Estágio","Score",""].map((h, i) => (
              <div key={i} className="text-[10.5px] font-semibold uppercase tracking-[0.7px]" style={{ color: dashPremium.tableHeadText }}>{h}</div>
            ))}
          </div>

          <AnimatePresence>
            {loading && contacts.length === 0 ? (
              <SkeletonRows rows={5} />
            ) : visible.length === 0 ? (
              <EmptyState
                Icon={Users}
                title={contacts.length === 0 ? "Nenhum contato ainda" : "Nenhum contato encontrado"}
                hint={contacts.length === 0 ? "Leads capturados pelo WhatsApp ou tráfego pago aparecem aqui automaticamente." : "Ajuste a busca ou o filtro de estágio."}
                action={{ label: "Criar novo lead", onClick: () => setNewModal(true) }}
                compact
              />
            ) : (
              visible.map((c, i) => {
                const sc = stageColors[c.stage] ?? stageColors["Novo"];
                return (
                  <motion.div key={c.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="grid grid-cols-[2.5fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 last:border-0 transition-colors cursor-pointer group items-center hover:bg-[#FAFAFB]"
                    style={{ borderBottom: `1px solid ${dashPremium.rowBorder}` }}
                    onClick={() => setSelected(c)}>
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar name={c.name} seed={c.id} size={34} hot={c.hot} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13px] font-semibold text-[#0F172A] truncate tracking-[-0.01em]">{c.name}</span>
                          {c.hot && <Star size={10} className="text-[#F59E0B] fill-[#F59E0B] flex-shrink-0" />}
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                          {c.tags && c.tags.length > 0 ? c.tags.slice(0, 2).map(t => (
                            <span key={t} className="text-[9.5px] font-medium px-1.5 py-[1px] rounded-[5px]" style={{ background: "rgba(15,23,42,0.045)", color: "#64748B" }}>{t}</span>
                          )) : (
                            <span className="text-[10.5px] text-[#94A3B8]">{c.phone || c.email || "sem contato"}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-[12.5px] text-[#64748B] truncate hidden lg:block">{c.company}</div>
                    <div className="text-[12.5px] font-semibold hidden lg:block tabular-nums" style={{ color: c.val === "—" ? "#CBD5E1" : "#0F172A" }}>{c.val}</div>
                    <div className="hidden lg:block">
                      <StatusBadge label={c.stage} scheme={sc} />
                    </div>
                    <div className="hidden lg:block">
                      <ScoreMeter score={c.score} />
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                      {[
                        { icon: MessageSquare, hoverColor: "#16A34A", onClick: () => info("WhatsApp", `Mensagem para ${c.name}`) },
                        { icon: Phone, hoverColor: "#2563EB", onClick: () => info("Ligando...", c.phone) },
                        { icon: Mail, hoverColor: "#0F172A", onClick: () => info("Email", c.email) },
                        { icon: Trash2, hoverColor: "#DC2626", onClick: () => setDeleteModal(c) },
                      ].map((a, ai) => {
                        const AIcon = a.icon;
                        return (
                          <button key={ai} onClick={a.onClick}
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all text-[#94A3B8] bg-white hover:-translate-y-px"
                            style={{ border: `1px solid ${dashPremium.hairline}`, boxShadow: "0 1px 2px rgba(15,23,42,0.05)" }}
                            onMouseEnter={e => { e.currentTarget.style.color = a.hoverColor; e.currentTarget.style.borderColor = `${a.hoverColor}40`; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.borderColor = dashPremium.hairline; }}>
                            <AIcon size={12} />
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* === CONTACT DETAIL DRAWER === */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40" onClick={() => setSelected(null)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm z-50 overflow-y-auto"
              style={{ background: "#FFFFFF", borderLeft: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={selected.name} seed={selected.id} size={48} hot={selected.hot} />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[16px] font-bold text-[#0A0A0A]">{selected.name}</span>
                        {selected.hot && <Star size={13} className="text-[#F59E0B] fill-[#F59E0B]" />}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">{selected.company}</div>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-xl bg-black/[0.035] hover:bg-black/[0.07] flex items-center justify-center text-[#6B7280] hover:text-[#0A0A0A] transition-all">
                    <X size={14} />
                  </button>
                </div>

                {/* Score + stage */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl p-3 text-center" style={{ background: "#FAFAFA" }}>
                    <div className="text-[24px] font-black" style={{ color: scoreColor(selected.score) }}>{selected.score}</div>
                    <div className="text-[10px] text-[#9CA3AF]">Score de qualificação</div>
                  </div>
                  <div className="rounded-xl p-3 text-center cursor-pointer" style={{ background: "#FAFAFA" }}
                    onClick={() => setEditStageModal(selected)}>
                    <div className="mb-1 flex justify-center">
                      <StatusBadge label={selected.stage} scheme={stageColors[selected.stage] ?? stageColors["Novo"]} />
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] flex items-center justify-center gap-0.5"><Edit size={9} /> Alterar estágio</div>
                  </div>
                </div>

                {/* Info */}
                <div className="rounded-2xl p-4 space-y-3" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                  {[
                    { label: "Telefone", val: selected.phone, icon: Phone },
                    { label: "Email", val: selected.email, icon: Mail },
                    { label: "Valor estimado", val: selected.val, icon: DollarSign },
                  ].map(f => {
                    const Icon = f.icon;
                    return (
                      <div key={f.label} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-black/[0.035] flex items-center justify-center flex-shrink-0"><Icon size={12} className="text-[#9CA3AF]" /></div>
                        <div>
                          <div className="text-[10px] text-[#9CA3AF]">{f.label}</div>
                          <div className="text-[12px] font-medium text-[#0A0A0A]">{f.val || "—"}</div>
                        </div>
                      </div>
                    );
                  })}
                  {selected.tags && selected.tags.length > 0 && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-black/[0.035] flex items-center justify-center flex-shrink-0"><Tag size={12} className="text-[#9CA3AF]" /></div>
                      <div className="flex flex-wrap gap-1">
                        {selected.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-[rgba(124,58,237,0.1)] text-[#6D28D9]">{t}</span>)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => info("WhatsApp", `Abrindo conversa com ${selected.name}`)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[rgba(37,211,102,0.1)] text-[#25D366] text-[12px] font-semibold hover:bg-[rgba(37,211,102,0.2)] transition-colors border border-[rgba(37,211,102,0.2)]">
                    <MessageSquare size={13} /> WhatsApp
                  </button>
                  <button onClick={() => info("Ligando...", selected.phone)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[rgba(59,130,246,0.1)] text-[#2563EB] text-[12px] font-semibold hover:bg-[rgba(59,130,246,0.2)] transition-colors border border-[rgba(59,130,246,0.2)]">
                    <Phone size={13} /> Ligar
                  </button>
                  <button onClick={() => info("Email", selected.email)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-black/[0.035] text-[#9CA3AF] text-[12px] font-semibold hover:bg-black/[0.07] transition-colors border border-black/[0.06]">
                    <Mail size={13} /> Email
                  </button>
                  <button onClick={() => toggleHot(selected)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold transition-colors border"
                    style={{ background: selected.hot ? "rgba(245,158,11,0.1)" : "rgba(0,0,0,0.035)", color: selected.hot ? "#F59E0B" : "#6B7280", borderColor: selected.hot ? "rgba(245,158,11,0.2)" : "rgba(0,0,0,0.06)" }}>
                    <Star size={13} className={selected.hot ? "fill-[#F59E0B]" : ""} /> {selected.hot ? "Quente" : "Favoritar"}
                  </button>
                  <button onClick={() => setDeleteModal(selected)}
                    className="col-span-2 flex items-center justify-center gap-1 py-2 rounded-xl bg-[rgba(239,68,68,0.08)] text-[#DC2626] text-[11px] hover:bg-[rgba(239,68,68,0.15)] transition-colors border border-[rgba(239,68,68,0.15)]">
                    <Trash2 size={11} /> Remover contato
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* === NEW CONTACT MODAL === */}
      <Modal open={newModal} onClose={() => setNewModal(false)} title="Novo lead" subtitle="Adiciona ao CRM automaticamente"
        footer={
          <>
            <button onClick={() => setNewModal(false)} className="px-4 py-2 rounded-xl text-[12px] text-[#6B7280] hover:text-[#0A0A0A] bg-black/[0.035] hover:bg-black/[0.07] transition-colors border border-black/[0.06]">Cancelar</button>
            <button onClick={addContact} className="px-4 py-2 rounded-xl text-[12px] font-semibold text-white bg-[#7C3AED] hover:bg-[#8B5CF6] transition-colors">Criar lead</button>
          </>
        }>
        <div className="space-y-4">
          {[
            { label: "Nome completo *", key: "name", icon: User, placeholder: "Ex: Ana Paula Ribeiro" },
            { label: "Empresa", key: "company", icon: Building2, placeholder: "Ex: Clínica Bella Vita" },
            { label: "Telefone / WhatsApp", key: "phone", icon: Phone, placeholder: "Ex: (11) 99999-0000" },
            { label: "Email", key: "email", icon: Mail, placeholder: "Ex: ana@empresa.com" },
            { label: "Valor estimado", key: "val", icon: DollarSign, placeholder: "Ex: R$ 8.400" },
          ].map(f => {
            const Icon = f.icon;
            return (
              <div key={f.key}>
                <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-1.5">{f.label}</label>
                <div className="relative">
                  <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                  <input type="text" placeholder={f.placeholder} value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full bg-white border border-black/[0.09] rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-[#0A0A0A] outline-none focus:border-[rgba(124,58,237,0.5)] transition-colors" />
                </div>
              </div>
            );
          })}
          <div>
            <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-1.5">Estágio inicial</label>
            <select value={form.stage} onChange={e => setForm(prev => ({ ...prev, stage: e.target.value }))}
              className="w-full bg-white border border-black/[0.09] rounded-xl px-4 py-2.5 text-[13px] text-[#0A0A0A] outline-none focus:border-[rgba(124,58,237,0.5)] transition-colors">
              {["Novo","Contato","Qualificado","Proposta","Fechamento"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-1.5">Tags (separadas por vírgula)</label>
            <div className="relative">
              <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input type="text" placeholder="Ex: Clínica, Alto ticket, VIP" value={form.tags}
                onChange={e => setForm(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full bg-white border border-black/[0.09] rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-[#0A0A0A] outline-none focus:border-[rgba(124,58,237,0.5)] transition-colors" />
            </div>
          </div>
        </div>
      </Modal>

      {/* === CHANGE STAGE MODAL === */}
      <Modal open={!!editStageModal} onClose={() => setEditStageModal(null)} title="Alterar estágio" size="sm">
        {editStageModal && (
          <div className="space-y-2">
            {Object.entries(stageColors).map(([stage, colors]) => (
              <button key={stage} onClick={() => changeStage(editStageModal, stage)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${editStageModal.stage === stage ? "bg-black/[0.05]" : "hover:bg-black/[0.03]"}`}
                style={{ border: `1px solid ${editStageModal.stage === stage ? colors.dot + "50" : "rgba(0,0,0,0.05)"}` }}>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: colors.dot }} />
                <span className="text-[13px] flex-1" style={{ color: editStageModal.stage === stage ? "#0F172A" : "#64748B", fontWeight: editStageModal.stage === stage ? 600 : 400 }}>{stage}</span>
                {editStageModal.stage === stage && <span className="text-[10px] text-[#6D28D9] font-semibold">atual</span>}
              </button>
            ))}
          </div>
        )}
      </Modal>

      {/* === DELETE MODAL === */}
      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Remover contato" size="sm"
        footer={
          <>
            <button onClick={() => setDeleteModal(null)} className="px-4 py-2 rounded-xl text-[12px] text-[#6B7280] hover:text-[#0A0A0A] bg-black/[0.035] transition-colors border border-black/[0.06]">Cancelar</button>
            <button onClick={() => deleteModal && deleteContact(deleteModal)} className="px-4 py-2 rounded-xl text-[12px] font-semibold text-white bg-[#EF4444] hover:bg-red-400 transition-colors">Remover</button>
          </>
        }>
        {deleteModal && (
          <div className="text-[13px] text-[#9CA3AF] leading-[1.6]">
            Tem certeza que deseja remover <strong className="text-[#0A0A0A]">{deleteModal.name}</strong> da {deleteModal.company} do CRM?
            <br />Esta ação não pode ser desfeita.
          </div>
        )}
      </Modal>
    </>
  );
}
