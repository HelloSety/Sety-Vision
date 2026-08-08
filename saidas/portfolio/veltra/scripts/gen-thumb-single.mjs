import { chromium } from "playwright";

const idx = Number(process.argv[2]);
const id = process.argv[3];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator("button", { hasText: "Configurar" }).nth(idx).click();
await page.waitForTimeout(30000);
await page.screenshot({ path: `public/car-thumbs/${id}.png`, clip: { x: 150, y: 200, width: 900, height: 500 } });

await browser.close();
console.log("done");
