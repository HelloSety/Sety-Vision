"use client";

import { useEffect, type ReactNode, type CSSProperties } from "react";

const CAL_NAMESPACE = "30min";
const CAL_LINK = "sety-studio-morc5w/30min";

type CalGlobal = {
  (...args: unknown[]): void;
  loaded?: boolean;
  ns: Record<string, (...args: unknown[]) => void>;
  q: unknown[];
};

declare global {
  interface Window {
    Cal?: CalGlobal;
  }
}

function loadCalEmbed() {
  if (typeof window === "undefined" || window.Cal) return;

  (function (C: Window, A: string, L: string) {
    const p = (a: { q: unknown[] }, ar: unknown) => a.q.push(ar);
    const d = C.document;

    const cal = function (...args: unknown[]) {
      const instance = C.Cal!;
      if (!instance.loaded) {
        instance.ns = {};
        instance.q = instance.q || [];
        const script = d.createElement("script");
        script.src = A;
        d.head.appendChild(script);
        instance.loaded = true;
      }
      if (args[0] === L) {
        const namespace = args[1] as string;
        const api = ((...a: unknown[]) => p(api as unknown as { q: unknown[] }, a)) as unknown as { q: unknown[] };
        api.q = api.q || [];
        if (typeof namespace === "string") {
          instance.ns[namespace] = instance.ns[namespace] || (api as unknown as (...a: unknown[]) => void);
          p(api, args);
          p(instance as unknown as { q: unknown[] }, ["initNamespace", namespace]);
        } else {
          p(instance as unknown as { q: unknown[] }, args);
        }
        return;
      }
      p(instance as unknown as { q: unknown[] }, args);
    } as CalGlobal;

    cal.loaded = false;
    cal.ns = {};
    cal.q = [];
    C.Cal = cal;
  })(window, "https://app.cal.com/embed/embed.js", "init");

  window.Cal!("init", CAL_NAMESPACE, { origin: "https://cal.com" });
  window.Cal!.ns[CAL_NAMESPACE]("ui", {
    theme: "dark",
    cssVarsPerTheme: {
      dark: { "cal-brand": "#2563EB" },
      light: { "cal-brand": "#2563EB" },
    },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
}

export function CalButton({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  useEffect(() => {
    loadCalEmbed();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config={JSON.stringify({ layout: "month_view", theme: "dark" })}
      style={{ border: "none", background: "none", padding: 0, margin: 0, cursor: "pointer", ...style }}
      className={className}
    >
      {children}
    </button>
  );
}
