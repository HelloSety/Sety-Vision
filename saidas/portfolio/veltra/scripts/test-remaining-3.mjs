import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

for (const idx of [6, 7, 8]) {
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.locator("button", { hasText: "Configurar" }).nth(idx).click();
  await page.waitForTimeout(11000);
  await page.screenshot({ path: `test-shots/car-hero-${idx + 1}.png` });
}

await browser.close();
console.log("done");
