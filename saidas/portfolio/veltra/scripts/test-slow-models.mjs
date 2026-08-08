import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "test-shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

for (const idx of [5, 8]) {
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.locator("button", { hasText: "Configurar" }).nth(idx).click();
  await page.waitForTimeout(18000);
  await page.screenshot({ path: `${OUT}/slow-model${idx}.png` });
}

await browser.close();
console.log("done");
