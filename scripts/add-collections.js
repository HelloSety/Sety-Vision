const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'clientes', 'monster-lupas', 'site', 'js', 'catalog.js');
let src = fs.readFileSync(file, 'utf8');

// Novidades: os 24 modelos recém-adicionados ao catálogo
const novidades = [
  'coilover', 'de-soto', 'double-x-24k', 'half-jacket', 'highland', 'hstn', 'lach',
  'm-frame', 'mag-four', 'penny', 'permian', 'pitboss', 'radar', 'radar-kit', 'radarlock',
  'romeo-1', 'romeo-2-carbon', 'sphaera', 'splice', 'spyke', 'straight-jacket', 'thump',
  'vilao-com-mola', 'x-squared',
];

// Edição Colecionador: modelos com apelo histórico/raro nas taglines
const colecionador = ['romeo-1', 'romeo-2-carbon', 'mag-four', 'thump', 'penny', 'x-squared', 'double-x-24k'];

// Linha Performance: modelos esportivos/alta performance
const performance = ['radar', 'radar-kit', 'radarlock', 'half-jacket', 'flak-2', 'spyke', 'straight-jacket', 'minute', 'plantaris'];

function addCollection(src, id, tag) {
  const needle = `id: '${id}',`;
  if (!src.includes(needle)) { console.log('NAO ENCONTRADO:', id); return src; }
  // evita duplicar collections se já existir
  const re = new RegExp(`(id: '${id}',\\n(?:.*\\n)*?\\s*collections: \\[)([^\\]]*)(\\])`);
  if (re.test(src)) {
    return src.replace(re, (m, pre, list, post) => {
      const items = list.split(',').map((s) => s.trim()).filter(Boolean);
      if (!items.includes(`'${tag}'`)) items.push(`'${tag}'`);
      return pre + items.join(', ') + post;
    });
  }
  return src.replace(needle, `id: '${id}',\n    collections: ['${tag}'],`);
}

let src2 = src;
novidades.forEach((id) => { src2 = addCollection(src2, id, 'novidades'); });
colecionador.forEach((id) => { src2 = addCollection(src2, id, 'colecionador'); });
performance.forEach((id) => { src2 = addCollection(src2, id, 'performance'); });

fs.writeFileSync(file, src2);
console.log('OK');
