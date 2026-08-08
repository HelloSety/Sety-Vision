import { readFileSync } from "node:fs";

const file = process.argv[2];
const buf = readFileSync(file);
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString("utf8"));

function accessorCount(i) {
  return json.accessors[i].count;
}

const vertCounts = new Map();
for (const mesh of json.meshes ?? []) {
  for (const prim of mesh.primitives ?? []) {
    if (prim.material === undefined) continue;
    const pos = prim.attributes?.POSITION;
    if (pos === undefined) continue;
    vertCounts.set(prim.material, (vertCounts.get(prim.material) ?? 0) + accessorCount(pos));
  }
}

function saturation([r, g, b]) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

console.log(`\n=== ${file} ===`);
(json.materials ?? []).forEach((m, i) => {
  if (!/^PaletteMaterial/.test(m.name || "")) return;
  const color = m.pbrMetallicRoughness?.baseColorFactor?.slice(0, 3) ?? [1, 1, 1];
  const hex = color.map((c) => Math.round(c * 255).toString(16).padStart(2, "0")).join("");
  console.log(
    `[${i}] ${m.name}: rgb=(${color.map((c) => c.toFixed(2)).join(",")}) #${hex} sat=${saturation(color).toFixed(2)} verts=${vertCounts.get(i) ?? 0} metal=${m.pbrMetallicRoughness?.metallicFactor ?? 1} rough=${m.pbrMetallicRoughness?.roughnessFactor ?? 1}`
  );
});
