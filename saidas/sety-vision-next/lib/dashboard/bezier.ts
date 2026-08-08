// Curva monotone cubic bezier — usada nos gráficos de linha do dashboard
// (receita, sparklines). Extraída de painel/page.tsx e demo/page.tsx, que
// tinham cópias idênticas dessa função.
export function monoPath(pts: [number, number][]): string {
  const n = pts.length;
  if (n < 2) return `M${pts[0]?.[0] ?? 0},${pts[0]?.[1] ?? 0}`;
  const dx = pts.slice(1).map((p, i) => p[0] - pts[i][0]);
  const dy = pts.slice(1).map((p, i) => p[1] - pts[i][1]);
  const s = dx.map((d, i) => (d === 0 ? 0 : dy[i] / d));
  const t: number[] = new Array(n);
  t[0] = s[0]; t[n - 1] = s[n - 2];
  for (let i = 1; i < n - 1; i++)
    t[i] = s[i - 1] * s[i] <= 0 ? 0 : (s[i - 1] + s[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(s[i]) < 1e-8) { t[i] = t[i + 1] = 0; continue; }
    const a = t[i] / s[i], b = t[i + 1] / s[i], r = Math.sqrt(a * a + b * b);
    if (r > 3) { t[i] *= 3 / r; t[i + 1] *= 3 / r; }
  }
  let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += ` C${(pts[i][0] + h).toFixed(2)},${(pts[i][1] + t[i] * h).toFixed(2)} ${(pts[i + 1][0] - h).toFixed(2)},${(pts[i + 1][1] - t[i + 1] * h).toFixed(2)} ${pts[i + 1][0].toFixed(2)},${pts[i + 1][1].toFixed(2)}`;
  }
  return d;
}
