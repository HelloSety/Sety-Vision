"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { DemoSidebar } from "@/app/components/demo/DemoSidebar";
import { DeviceSwitcher } from "@/app/components/demo/DeviceSwitcher";
import { PhoneFrame } from "@/app/components/demo/PhoneFrame";
import { DemoSegmentProvider } from "@/lib/demo/context";
import { DeviceProvider, useDevice } from "@/lib/demo/device-context";

function DemoShell({ children }: { children: React.ReactNode }) {
  const { device } = useDevice();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFramed = searchParams.get("frame") === "1";

  // Dentro do próprio iframe do preview mobile, não mostrar de novo o seletor
  // de dispositivo nem a barra lateral desktop — só o conteúdo da página,
  // que já reflui pro layout mobile sozinho (breakpoint real, não escala falsa).
  if (isFramed) {
    return (
      <div className="flex h-screen bg-[#FAFAFA] overflow-hidden text-[#0A0A0A]">
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
        <DemoSidebar />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA] overflow-hidden text-[#0A0A0A]">
      <div className="flex items-center justify-between px-5 h-14 border-b border-black/[0.07] bg-white flex-shrink-0">
        <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wide">Visualizar como</span>
        <DeviceSwitcher />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {device === "desktop" ? (
          <>
            <DemoSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
          </>
        ) : device === "celular" ? (
          <PhoneFrame src={`${pathname}?frame=1`} />
        ) : (
          <PhoneFrame src="/demo/conversas?frame=1" />
        )}
      </div>
    </div>
  );
}

export default function DemoRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoSegmentProvider>
      <DeviceProvider>
        <Suspense fallback={null}>
          <DemoShell>{children}</DemoShell>
        </Suspense>
      </DeviceProvider>
    </DemoSegmentProvider>
  );
}
