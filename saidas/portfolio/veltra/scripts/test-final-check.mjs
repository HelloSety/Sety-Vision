import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "test-shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.locator("button", { hasText: "Configurar" }).first().click();
await page.waitForTimeout(6000);

// view1 (3/4 frente, default) -> next x3 = Topo (index 4)
for (let i = 0; i < 3; i++) {
  await page.locator('button[aria-label="Próxima vista"]').click();
  await page.waitForTimeout(1200);
}
await page.screenshot({ path: `${OUT}/final-topo.png` });

// next -> Interior (index 5)
await page.locator('button[aria-label="Próxima vista"]').click();
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/final-interior.png` });

// next -> Frente (index 0), volta pro início do ciclo
await page.locator('button[aria-label="Próxima vista"]').click();
await page.waitForTimeout(1400);
await page.screenshot({ path: `${OUT}/final-frente.png` });

await browser.close();
console.log("done");
