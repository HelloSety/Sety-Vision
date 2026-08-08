import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));
page.on("console", (msg) => { if (msg.type() === "error") console.log("[console error]", msg.text()); });

await page.goto("http://localhost:3000/site", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "test-shots/site-page-full.png", fullPage: true });

await browser.close();
console.log("done");
