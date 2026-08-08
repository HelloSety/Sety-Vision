"use client";

import { useState } from "react";
import { Bell, Plus, ChevronDown, Command, Building2, Check } from "lucide-react";
import { openCommandPalette } from "@/app/components/ui/CommandPalette";
import { useDemoSegment, SEGMENTS } from "@/lib/demo/context";
import { dash } from "@/lib/tokens";

interface TopbarProps {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick?: () => void };
  breadcrumbs?: { label: string; href?: string }[];
  showSegmentSwitcher?: boolean;
}

function SegmentSwitcher() {
  const { segment, setSegmentId } = useDemoSegment();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-all hover:bg-[#7C3AED]/[0.1]"
        style={{ background: "rgba(124,58,237,0.06)", border: `1px solid ${dash.purple}33`, color: dash.purple }}
      >
        <Building2 size={12} />
        {segment.label}
        <ChevronDown size={11} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-48 rounded-xl shadow-xl overflow-hidden py-1"
            style={{ background: dash.card, border: `1px solid ${dash.border}` }}>
            {SEGMENTS.map((s) => (
              <button
                key={s.id}
                onClick={() => { setSegmentId(s.id); setOpen(false); }}
                className="flex items-center justify-between w-full px-3 py-2 text-[12.5px] text-left hover:bg-black/[0.03] transition-colors"
              >
                <span style={s.id === segment.id ? { fontWeight: 600, color: dash.ink } : { color: dash.textSub }}>{s.label}</span>
                {s.id === segment.id && <Check size={12} color={dash.purple} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Topbar({ title, subtitle, action, breadcrumbs, showSegmentSwitcher }: TopbarProps) {
  return (
    <header className="flex items-center justify-between h-16 px-6 flex-shrink-0"
      style={{ background: dash.card, borderBottom: `1px solid ${dash.border}` }}>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1.5 mb-0.5">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-[10px]" style={{ color: "#D1D5DB" }}>/</span>}
                <span className="text-[10px] font-medium" style={{ color: dash.textMuted }}>{b.label}</span>
              </span>
            ))}
          </div>
        )}
        <h1 className="text-[15px] font-bold leading-none" style={{ color: dash.ink }}>{title}</h1>
        {subtitle && <p className="text-[11px] mt-0.5" style={{ color: dash.textSub }}>{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {showSegmentSwitcher && (
          <>
            <SegmentSwitcher />
            <div className="w-px h-6" style={{ background: dash.border }} />
          </>
        )}
        {/* Command Palette trigger */}
        <button
          onClick={openCommandPalette}
          className="flex items-center gap-2 bg-black/[0.03] border border-black/[0.06] rounded-xl px-3 py-1.5 text-[12px] text-[#6B7280] hover:text-[#0A0A0A] hover:border-black/[0.12] transition-all group"
        >
          <Command size={12} className="group-hover:text-[#16A34A] transition-colors" />
          <span>Buscar...</span>
          <kbd className="text-[10px] border border-black/[0.10] rounded px-1">⌘K</kbd>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-black/[0.03] border border-black/[0.06] flex items-center justify-center text-[#6B7280] hover:text-[#0A0A0A] hover:border-black/[0.12] transition-all">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white" style={{ background: dash.red }} />
        </button>

        {/* Action */}
        {action && (
          <button
            onClick={action.onClick}
            className="flex items-center gap-1.5 bg-[#111111] hover:bg-black text-white px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors"
          >
            <Plus size={14} />
            {action.label}
          </button>
        )}

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer pl-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${dash.greenText}, ${dash.blue})` }}>
            S
          </div>
          <ChevronDown size={13} color={dash.textSub} />
        </div>
      </div>
    </header>
  );
}
