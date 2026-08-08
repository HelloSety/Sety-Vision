import { readFileSync } from "node:fs";

const file = process.argv[2];
const buf = readFileSync(file);
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString("utf8"));

const materials = json.materials ?? [];
const counts = new Map(); // materialIndex -> total vertex count across primitives

function accessorCount(accessorIndex) {
  return json.accessors[accessorIndex].count;
}

for (const mesh of json.meshes ?? []) {
  for (const prim of mesh.primitives ?? []) {
    if (prim.material === undefined) continue;
    const posAccessor = prim.attributes?.POSITION;
    if (posAccessor === undefined) continue;
    const count = accessorCount(posAccessor);
    counts.set(prim.material, (counts.get(prim.material) ?? 0) + count);
  }
}

const rows = [...counts.entries()]
  .map(([idx, count]) => ({ idx, name: materials[idx]?.name || "(sem nome)", count }))
  .sort((a, b) => b.count - a.count);

console.log(`\n=== ${file} — materiais por contagem de vértices (desc) ===`);
rows.forEach((r) => console.log(`  [${r.idx}] ${r.name}: ${r.count} vértices`));
