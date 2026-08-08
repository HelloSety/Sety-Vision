import { chromium } from "playwright";

// Sem forçar swiftshader — tenta usar GPU real da máquina (Windows do Seven
// tem GPU de verdade, diferente de um CI headless sem hardware).
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator("button", { hasText: "Configurar" }).nth(3).click();
await page.waitForTimeout(8000);
await page.screenshot({ path: "test-shots/real-gpu-test.png" });

await browser.close();
console.log("done");
