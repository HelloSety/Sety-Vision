"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type DeviceMode = "desktop" | "celular" | "whatsapp";

type DeviceContextValue = {
  device: DeviceMode;
  setDevice: (d: DeviceMode) => void;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [device, setDevice] = useState<DeviceMode>("desktop");
  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevice precisa estar dentro de <DeviceProvider>");
  return ctx;
}
