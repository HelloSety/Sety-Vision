"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { SEGMENTS, DEFAULT_SEGMENT_ID, getSegment, type Segment } from "./segments";

type DemoContextValue = {
  segment: Segment;
  setSegmentId: (id: string) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoSegmentProvider({ children }: { children: ReactNode }) {
  const [segmentId, setSegmentId] = useState(DEFAULT_SEGMENT_ID);
  const segment = getSegment(segmentId);
  return (
    <DemoContext.Provider value={{ segment, setSegmentId }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoSegment() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoSegment precisa estar dentro de <DemoSegmentProvider>");
  return ctx;
}

export { SEGMENTS };
