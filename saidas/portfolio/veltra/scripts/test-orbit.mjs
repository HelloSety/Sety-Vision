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
await page.waitForTimeout(5000);
await page.screenshot({ path: `${OUT}/orbit-00-before.png` });

// arrasta da direita pra esquerda bem no meio da tela
await page.mouse.move(1200, 450);
await page.mouse.down();
await page.mouse.move(500, 450, { steps: 20 });
await page.mouse.up();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/orbit-01-after-drag.png` });

await browser.close();
console.log("done");
