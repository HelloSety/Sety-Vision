import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

await page.goto("https://veltra-ten.vercel.app", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "test-shots/live-overview.png", fullPage: true });

await browser.close();
console.log("done");
