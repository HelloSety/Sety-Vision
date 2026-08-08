import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on("console", (msg) => console.log(msg.text()));
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator("button", { hasText: "Configurar" }).nth(3).click();
await page.waitForTimeout(6000);

await browser.close();
console.log("done");
