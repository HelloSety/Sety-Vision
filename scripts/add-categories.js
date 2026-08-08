const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'clientes', 'monster-lupas', 'site', 'js', 'catalog.js');
let src = fs.readFileSync(file, 'utf8');

const cat = {
  plantaris: 'esportiva', plate: 'x-metal', minute: 'esportiva', juliet: 'x-metal',
  'flak-2': 'esportiva', 'eye-jacket': 'classica', dartboard: 'classica',
  coilover: 'streetwear', 'de-soto': 'classica', 'double-x-24k': 'x-metal',
  'half-jacket': 'esportiva', highland: 'classica', hstn: 'classica', lach: 'streetwear',
  'm-frame': 'x-metal', 'mag-four': 'x-metal', penny: 'x-metal', permian: 'classica',
  pitboss: 'classica', radar: 'esportiva', 'radar-kit': 'esportiva', radarlock: 'esportiva',
  'romeo-1': 'x-metal', 'romeo-2-carbon': 'x-metal', sphaera: 'classica', splice: 'classica',
  spyke: 'esportiva', 'straight-jacket': 'esportiva', thump: 'classica',
  'vilao-com-mola': 'streetwear', 'x-squared': 'x-metal',
};

let count = 0;
for (const [id, category] of Object.entries(cat)) {
  const needle = `id: '${id}',`;
  if (!src.includes(needle)) { console.log('NAO ENCONTRADO:', id); continue; }
  src = src.replace(needle, `id: '${id}',\n    category: '${category}',`);
  count++;
}
fs.writeFileSync(file, src);
console.log('Substituicoes feitas:', count, 'de', Object.keys(cat).length);
