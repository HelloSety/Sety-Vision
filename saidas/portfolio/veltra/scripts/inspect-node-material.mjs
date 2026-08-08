import { readFileSync } from "node:fs";

const file = process.argv[2];
const filterRe = new RegExp(process.argv[3], "i");
const buf = readFileSync(file);
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString("utf8"));

for (const node of json.nodes ?? []) {
  if (node.mesh === undefined) continue;
  const name = node.name || `node_mesh_${node.mesh}`;
  if (!filterRe.test(name)) continue;
  const mesh = json.meshes[node.mesh];
  mesh.primitives.forEach((p, i) => {
    const mat = json.materials[p.material];
    console.log(`node="${name}" prim${i} material[${p.material}]="${mat?.name}" hasTexture=${!!mat?.pbrMetallicRoughness?.baseColorTexture}`);
  });
}
