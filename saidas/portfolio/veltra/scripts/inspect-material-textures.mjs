import { readFileSync } from "node:fs";

const file = process.argv[2];
const buf = readFileSync(file);
const jsonLen = buf.readUInt32LE(12);
const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString("utf8"));

console.log(`\n=== ${file} ===`);
(json.materials ?? []).forEach((m, i) => {
  if (!/^PaletteMaterial/.test(m.name || "")) return;
  const tex = m.pbrMetallicRoughness?.baseColorTexture;
  if (!tex) {
    console.log(`[${i}] ${m.name}: sem baseColorTexture`);
    return;
  }
  const texture = json.textures[tex.index];
  const transform = tex.extensions?.KHR_texture_transform;
  console.log(
    `[${i}] ${m.name}: texture=${tex.index} image=${texture.source} transform=${JSON.stringify(transform)}`
  );
});

console.log("images:", (json.images ?? []).map((img, i) => `[${i}] ${img.name || img.mimeType}`));
