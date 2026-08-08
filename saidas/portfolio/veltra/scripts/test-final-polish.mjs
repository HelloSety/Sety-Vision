import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

// BMW X3 (idx 7) — confirma roda solta sumiu
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator("button", { hasText: "Configurar" }).nth(7).click();
await page.waitForTimeout(9000);
await page.screenshot({ path: "test-shots/polish-bmw-x3.png" });

// Ferrari 812 (idx 0) — confirma farol/lanterna acesos
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator("button", { hasText: "Configurar" }).nth(0).click();
await page.waitForTimeout(9000);
await page.screenshot({ path: "test-shots/polish-ferrari-812.png" });

await browser.close();
console.log("done");
