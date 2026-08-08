import { readFileSync } from "node:fs";

const file = process.argv[2];
const buf = readFileSync(file);
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString("utf8"));

function nodeWorldMatrix(nodeIndex, parentMatrix) {
  const node = json.nodes[nodeIndex];
  let m = parentMatrix;
  if (node.matrix) {
    // combine (approx: just use translation component for our purpose)
  }
  const t = node.translation || [0, 0, 0];
  const world = [parentMatrix[0] + t[0], parentMatrix[1] + t[1], parentMatrix[2] + t[2]];
  return world;
}

// acha a raiz da cena e percorre somando translations (aproximação suficiente
// pra achar outlier de posição, já que a maioria dos nós de carro não tem
// rotação/escala herdada extrema)
const results = [];
function walk(nodeIndex, accum) {
  const node = json.nodes[nodeIndex];
  const t = node.translation || [0, 0, 0];
  const pos = [accum[0] + t[0], accum[1] + t[1], accum[2] + t[2]];
  if (node.mesh !== undefined) {
    const mesh = json.meshes[node.mesh];
    const matNames = mesh.primitives.map((p) => json.materials[p.material]?.name).join(",");
    results.push({ node: node.name || `node_${nodeIndex}`, pos, mesh: mesh.name, mats: matNames });
  }
  (node.children || []).forEach((c) => walk(c, pos));
}
const sceneRoots = json.scenes[json.scene ?? 0].nodes;
sceneRoots.forEach((r) => walk(r, [0, 0, 0]));

// mediana de posição X pra achar quem está fora do cluster principal
const xs = results.map((r) => r.pos[0]).sort((a, b) => a - b);
const medianX = xs[Math.floor(xs.length / 2)];

results.sort((a, b) => Math.abs(b.pos[0] - medianX) - Math.abs(a.pos[0] - medianX));
console.log(`medianX=${medianX.toFixed(3)}`);
results.slice(0, 8).forEach((r) => {
  console.log(`node="${r.node}" mesh="${r.mesh}" pos=(${r.pos.map((v) => v.toFixed(3))}) mats=${r.mats}`);
});
