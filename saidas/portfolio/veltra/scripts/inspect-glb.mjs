import { readFileSync } from "node:fs";

const file = process.argv[2];
const buf = readFileSync(file);

const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString("utf8"));

console.log(`\n=== ${file} ===`);
console.log("skins:", json.skins?.length ?? 0);
console.log("materials:");
(json.materials ?? []).forEach((m, i) => console.log(`  [${i}]`, m.name || "(sem nome)"));
console.log("meshes/primitives (nome do node quando disponível):");
const meshNames = new Set();
(json.nodes ?? []).forEach((n) => {
  if (n.mesh !== undefined) meshNames.add(n.name || `node_mesh_${n.mesh}`);
});
[...meshNames].forEach((n) => console.log("  -", n));
