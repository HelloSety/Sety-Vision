import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

for (let i = 0; i < 9; i++) {
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.locator("button", { hasText: "Configurar" }).nth(i).click();
  await page.waitForTimeout(11000);
  await page.screenshot({ path: `test-shots/car-check-${i + 1}.png` });
  console.log(`done car ${i + 1}`);
}

await browser.close();
console.log("all done");
