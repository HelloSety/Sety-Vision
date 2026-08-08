"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/demo" },
  { icon: Users,           label: "CRM",       href: "/demo/crm" },
  { icon: MessageSquare,   label: "Conversas", href: "/demo/conversas" },
];

export function DemoSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / tablet — coluna lateral fixa */}
      <aside className="hidden md:flex w-[200px] flex-shrink-0 flex-col h-full bg-white border-r border-black/[0.07]">
        <div className="flex items-center h-16 px-4 border-b border-black/[0.07] flex-shrink-0 gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-[12px] font-black text-[#0A0A0A] tracking-wide">SETY VISION</div>
        </div>

        <nav className="flex-1 px-2 pt-4 space-y-0.5">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 no-underline w-full",
                  active ? "bg-black/[0.05] text-[#0A0A0A]" : "text-[#9CA3AF] hover:text-[#0A0A0A] hover:bg-black/[0.03]"
                )}
              >
                {active && (
                  <div style={{ width: 3, height: 20 }} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#7C3AED] rounded-r-full" />
                )}
                <Icon size={15} className="flex-shrink-0" />
                <span className="text-[13px] font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="border-t border-black/[0.07] px-4 py-4">
          <div className="text-[10.5px] text-[#9CA3AF] leading-relaxed">
            Ambiente de demonstração.<br />Nenhuma ação aqui afeta dados reais.
          </div>
        </div>
      </aside>

      {/* Mobile / preview no celular — barra inferior estilo app nativo */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-black/[0.08] px-2 py-2" style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}>
        <div className="flex items-center justify-around w-full">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl no-underline"
                style={{ color: active ? "#7C3AED" : "#9CA3AF" }}
              >
                <Icon size={20} />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
