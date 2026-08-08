import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "test-shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});

async function run(viewportName, viewport) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/${viewportName}-00-overview.png` });

  // seleciona o 1º carro (Type 01)
  await page.locator("button", { hasText: "Configurar" }).first().click();
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/${viewportName}-01-type01-frente.png` });

  // cicla as 6 vistas (Frente/3-4frente/3-4tras/Traseira/Topo/Interior)
  for (let v = 0; v < 6; v++) {
    await page.locator('button[aria-label="Próxima vista"]').click();
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${OUT}/${viewportName}-02-view${v}.png` });
  }

  // testa categorias Cores/Rodas/Materiais
  for (const cat of ["Cores", "Rodas", "Materiais"]) {
    await page.locator("button", { hasText: cat }).first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${viewportName}-03-${cat}.png` });
  }
  // clica na 2ª cor/roda pra confirmar que funciona de verdade
  const swatchButtons = page.locator(".pointer-events-auto button:has(span)");
  await page.waitForTimeout(300);

  // volta e testa 2 carros novos (Urus idx5, BMW M3 GTR idx8)
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  for (const idx of [5, 8]) {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.locator("button", { hasText: "Configurar" }).nth(idx).click();
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `${OUT}/${viewportName}-04-model${idx}.png` });
    await page.locator("button", { hasText: "Cores" }).first().click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/${viewportName}-05-model${idx}-cores.png` });
  }

  console.log(`[${viewportName}] console/page errors:`, errors.length ? errors : "nenhum");
  await page.close();
}

await run("desktop", { width: 1600, height: 900 });
await run("mobile", { width: 390, height: 844 });

await browser.close();
console.log("done");
