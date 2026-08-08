import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator("button", { hasText: "Configurar" }).nth(6).click();
await page.waitForTimeout(9000);
await page.screenshot({ path: "test-shots/huracan-no-doors.png" });

await browser.close();
console.log("done");
