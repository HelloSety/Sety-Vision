import { chromium } from "playwright";

const browser = await chromium.launch({
  args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator("button", { hasText: "Configurar" }).nth(4).click();
await page.waitForTimeout(9000);
await page.screenshot({ path: "test-shots/urus-fixed.png" });

await browser.close();
console.log("done");
