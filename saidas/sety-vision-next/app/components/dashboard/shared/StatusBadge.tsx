"use client";

/**
 * Badge de status premium — dot de cor + label em forma deliberada
 * (radius 7, tinta de fundo a 8%, hairline na cor), em vez de pill
 * genérico colorido.
 */

export type BadgeScheme = { dot: string; text: string; bg: string; border?: string };

export function StatusBadge({
  label,
  scheme,
  size = "md",
}: {
  label: string;
  scheme: BadgeScheme;
  size?: "sm" | "md";
}) {
  const sm = size === "sm";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: sm ? 4 : 5,
        padding: sm ? "2px 7px" : "3px 9px",
        borderRadius: 7,
        background: scheme.bg,
        border: `1px solid ${scheme.border ?? scheme.dot + "2E"}`,
        fontSize: sm ? 10 : 11,
        fontWeight: 600,
        color: scheme.text,
        lineHeight: 1.5,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: sm ? 4 : 5,
          height: sm ? 4 : 5,
          borderRadius: "50%",
          background: scheme.dot,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}
