const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const NAMES = {
  s1: 'slide-01.png',
  s2: 'slide-02.png',
  s3: 'slide-03.png',
  s4: 'slide-04.png',
  s5: 'slide-05.png',
};

const htmlPath = path.join(__dirname, 'carrossel.html');
const outLocal = path.join(__dirname, 'instagram');

fs.mkdirSync(outLocal, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);

  for (const [id, filename] of Object.entries(NAMES)) {
    const el = await page.$(`#${id}`);
    if (!el) { console.warn(`! slide ${id} não encontrado`); continue; }
    const buf = await el.screenshot({ type: 'png' });
    fs.writeFileSync(path.join(outLocal, filename), buf);
    console.log(`✓ ${filename}`);
  }

  await browser.close();
  console.log('\nRenderizado em:', outLocal);
})();
