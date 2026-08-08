# Páginas por nicho + correção de conflito de preço (2026-07-11)

**Decisão:** Criadas 3 landing pages dedicadas em `saidas/sety-vision-next` para receber tráfego pago e prospecção ativa dos 3 nichos foco (ver `MEMORY/DECISOES/2026-07-11-estrategia-goto-market-r30k.md`):

- `/clinicas` — estética e odontologia
- `/advocacia` — escritórios de advocacia
- `/energia-solar` — instaladoras de energia solar

Cada página tem hero com dor específica do nicho, bloco "dores" (problema→solução) próprio, e reaproveita Prova Social, Pricing, FAQ, CTA final e Footer da home (mesma fonte, sem duplicar conteúdo). Header simplificado (logo + CTA único), sem os links de âncora da home — pensado pra tráfego pago de conversão direta, não navegação.

Componente reutilizável: `app/components/niche/NicheLanding.tsx`. Mensagens de WhatsApp por nicho em `lib/whatsapp.ts` (`clinicaHero`, `advocaciaHero`, `solarHero`). Sitemap (`app/sitemap.ts`) atualizado com as 3 rotas.

## Conflito de preço resolvido

O site (`Pricing.tsx`) mostrava Growth R$497/mês e Scale R$997/mês, mas o agente Aurora no WhatsApp já cotava R$697 e R$1.497 pros mesmos planos — conflito identificado e deixado em aberto em `2026-07-06-sety-studio-institucional-rebrand-sistemas-comerciais-ia.md`. Confirmado por Seven em 2026-07-11: **valor correto é R$697 (Growth) e R$1.497 (Scale)** — o site foi corrigido pra bater com o que o bot já cotiza. Valores de setup (R$2.490 e R$4.990) e o plano Start (R$297+R$1.490) não mudaram.

**Why:** site e bot cotando valores diferentes pro mesmo plano quebra confiança no meio da prospecção ativa que já está em andamento (lead responde no Kaptar, confere o site, vê número diferente).

**How to apply:** `project_sety_vision_pricing` (memória própria) estava desatualizada quanto a esse conflito — atualizar se voltar a divergir. Build validado com `npm run build` (Next 16.2.9, Turbopack) sem erros antes de considerar pronto para deploy.

**Pendente:** publicar em produção (`vercel --prod`, checando `.vercel/project.json` antes — ver incidente de projeto compartilhado registrado em memória) e ligar tráfego pago apontando pra cada rota.
