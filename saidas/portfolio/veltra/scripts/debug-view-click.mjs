import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on("console", (msg) => console.log(`[console:${msg.type()}]`, msg.text()));
page.on("pageerror", (err) => console.log("[pageerror]", err.message, err.stack));
page.on("crash", () => console.log("[PAGE CRASHED]"));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator("button", { hasText: "Configurar" }).first().click();
await page.waitForTimeout(11000);
console.log("about to click Frente...");
try {
  await page.locator('[aria-label="Frente"]').click({ timeout: 8000 });
  console.log("click succeeded");
} catch (e) {
  console.log("click FAILED:", e.message);
  await page.screenshot({ path: "test-shots/debug-stuck.png" });
}
await page.waitForTimeout(1000);

await browser.close();
console.log("done");
