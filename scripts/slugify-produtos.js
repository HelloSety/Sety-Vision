const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'clientes', 'monster-lupas', 'site', 'assets', 'produtos');

function slugify(name) {
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\.jpg$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') + '.jpg';
}

const map = {};
const dirs = fs.readdirSync(ROOT).filter((d) => fs.statSync(path.join(ROOT, d)).isDirectory());

for (const dir of dirs) {
  const dirPath = path.join(ROOT, dir);
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.jpg'));
  map[dir] = [];
  for (const file of files) {
    const colorName = file.replace(/\.jpg$/, '');
    const slug = slugify(file);
    if (slug !== file) {
      fs.renameSync(path.join(dirPath, file), path.join(dirPath, slug));
    }
    map[dir].push({ color: colorName, file: slug });
  }
  map[dir].sort((a, b) => a.file.localeCompare(b.file));
}

fs.writeFileSync(path.join(__dirname, 'produtos-map.json'), JSON.stringify(map, null, 2));
console.log('OK. Pastas processadas:', dirs.length);
