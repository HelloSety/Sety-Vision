import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "public/car-details";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

const CAR_COUNT = 9;

for (let i = 0; i < CAR_COUNT; i++) {
  const id = `type-0${i + 1}`;
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.locator("button", { hasText: "Configurar" }).nth(i).click();
  await page.waitForTimeout(11000);

  // vista 1 = Frente (índice 0, botão "1") — farol
  await page.locator('[aria-label="Frente"]').click();
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/${id}-headlight.png`, clip: { x: 750, y: 380, width: 400, height: 300 } });

  // vista 2 = 3/4 frente (botão "2") — roda dianteira
  await page.locator('[aria-label="3/4 frente"]').click();
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/${id}-wheel.png`, clip: { x: 150, y: 400, width: 500, height: 400 } });

  // vista 4 = Traseira (botão "4") — lanterna
  await page.locator('[aria-label="Traseira"]').click();
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/${id}-taillight.png`, clip: { x: 750, y: 380, width: 400, height: 300 } });

  // vista 6 = Interior (botão "6")
  await page.locator('[aria-label="Interior"]').click();
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}/${id}-interior.png`, clip: { x: 150, y: 150, width: 900, height: 600 } });

  console.log(`done ${id}`);
}

await browser.close();
console.log("all done");
