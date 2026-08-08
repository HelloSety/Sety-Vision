"use client";

import { Sidebar } from "@/app/components/dashboard/Sidebar";
import { ToastProvider } from "@/app/components/ui/Toast";
import { CommandPalette } from "@/app/components/ui/CommandPalette";
import { dash, dashRadius, dashShadow } from "@/lib/tokens";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="h-screen w-screen flex items-center justify-center p-2.5 md:p-4" style={{ background: dash.shellBg }}>
        {/*
          transform: translateZ(0) é OBRIGATÓRIO — cria containing block pra
          position:fixed (modais/drawers) respeitarem o cartão arredondado.
          Não remover (ver MEMORY/PROJETOS/sety-vision-dashboard-dark-sidebar-2026-07.md).
        */}
        <div
          className="flex w-full h-full overflow-hidden"
          style={{ borderRadius: dashRadius.shell, boxShadow: dashShadow.shell, background: dash.card, color: dash.ink, transform: "translateZ(0)" }}
        >
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      <CommandPalette />
    </ToastProvider>
  );
}
