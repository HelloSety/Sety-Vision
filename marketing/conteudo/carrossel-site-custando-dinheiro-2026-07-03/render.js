const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const NAMES = {
  s1: '01-Capa.png',
  s2: '02-Design-Vende.png',
  s3: '03-Estrutura-Converte.png',
  s4: '04-Dados-Impulsionam.png',
  s5: '05-CTA.png',
};

const htmlPath = path.join(__dirname, 'carrossel.html');
const outLocal = path.join(__dirname, 'instagram');
const outDownloads = 'C:/Users/seven/Downloads/Instagram-Carrossel';

fs.mkdirSync(outLocal, { recursive: true });
fs.mkdirSync(outDownloads, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);

  for (const [id, filename] of Object.entries(NAMES)) {
    const el = await page.$(`#${id}`);
    if (!el) { console.warn(`! slide ${id} não encontrado`); continue; }
    const buf = await el.screenshot({ type: 'png' });
    fs.writeFileSync(path.join(outLocal, filename), buf);
    fs.writeFileSync(path.join(outDownloads, filename), buf);
    console.log(`✓ ${filename}`);
  }

  await browser.close();
  console.log('\nRenderizado em:');
  console.log(' -', outLocal);
  console.log(' -', outDownloads);
})();
