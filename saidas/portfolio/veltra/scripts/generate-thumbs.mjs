import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "public/car-thumbs";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

for (let i = 0; i < 9; i++) {
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.locator("button", { hasText: "Configurar" }).nth(i).click();
  // 9s e depois 18s ainda não bastavam — o carro aparecia sem pintura/luz
  // (a sonda de Environment/Lightformer ainda não tinha terminado de
  // renderizar em swiftshader, muito mais lento que GPU real). É só uma
  // imagem estática gerada uma vez, então generoso aqui não custa nada.
  await page.waitForTimeout(30000);
  const id = `type-0${i + 1}`;
  await page.screenshot({ path: `${OUT}/${id}.png`, clip: { x: 150, y: 200, width: 900, height: 500 } });
  console.log(`saved ${id}`);
}

await browser.close();
console.log("done");
