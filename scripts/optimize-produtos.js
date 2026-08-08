const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'clientes', 'monster-lupas', 'site', 'assets', 'produtos');
const MAX_W = 900;
const QUALITY = 78;

async function run() {
  const dirs = fs.readdirSync(ROOT).filter((d) => fs.statSync(path.join(ROOT, d)).isDirectory());
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const dir of dirs) {
    const dirPath = path.join(ROOT, dir);
    const files = fs.readdirSync(dirPath).filter((f) => /\.(png|jpe?g|webp|jfif)$/i.test(f));
    for (const file of files) {
      const srcPath = path.join(dirPath, file);
      const before = fs.statSync(srcPath).size;
      totalBefore += before;
      const newName = file.replace(/\.(png|jpe?g|webp|jfif)$/i, '.jpg');
      const tmpPath = srcPath + '.tmp.jpg';
      await sharp(srcPath)
        .resize({ width: MAX_W, height: MAX_W, fit: 'inside', withoutEnlargement: true })
        .flatten({ background: '#f7f7f5' })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(tmpPath);
      for (let attempt = 0; attempt < 15; attempt++) {
        try { fs.unlinkSync(srcPath); break; } catch (e) {
          if (attempt === 14) { console.warn(`Falhou ao apagar ${srcPath}, seguindo...`); break; }
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
      const finalPath = path.join(dirPath, newName);
      fs.renameSync(tmpPath, finalPath);
      const after = fs.statSync(finalPath).size;
      totalAfter += after;
      count++;
    }
  }
  console.log(`Processadas ${count} imagens`);
  console.log(`Antes: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Depois: ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
}

run().catch((e) => { console.error(e); process.exit(1); });
