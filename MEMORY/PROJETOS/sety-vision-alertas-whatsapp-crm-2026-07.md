# Sety Vision — Seção "Alertas de Lead Quente" na landing (2026-07-12)

**Status:** concluído e testado localmente (localhost:3417, screenshots via Playwright, desktop + mobile) — não deployado ainda.

## O que foi feito

Pedido do usuário: mostrar no site `setystudio.com.br` como o CRM avisa o cliente no WhatsApp quando um lead esquenta, usando 4 prints reais de `C:\Users\seven\Downloads\PRINTS WHATSAPP` como exemplo (notificação "🔥 Lead Quente — Ação Necessária" com Contato/Telefone/Score/Status/Última mensagem).

- Criado `app/components/landing/WhatsAppAlerts.tsx` (`saidas/sety-vision-next`) — recria a bolha de notificação do WhatsApp em React/CSS (fiel ao visual dos prints: fundo `#DCF8C6`, header de app estilo WhatsApp, check azul duplo) em vez de subir as imagens originais como PNG.
- Integrado em `app/page.tsx`, logo após `<HowItWorks />` (que termina no passo "CRM salva") e antes de `<LiveResults />` — reforça visualmente a etapa de notificação em tempo real.
- Usa 3 dos 4 leads reais dos prints (Vitor Kaique, Lucas, Geovane — omitido o 4º, de outro nicho/contexto confuso pro visitante do site). Nome, score, status e mensagem são reais; **telefone fica parcialmente mascarado** (ex: `5562••••0555`, mantém DDI+DDD+últimos 4 dígitos).

## Decisão de privacidade — importante se repetir o padrão

O classificador de auto mode do Claude Code bloqueou a primeira tentativa de testar a página, sinalizando que publicar nome + telefone de leads reais (terceiros que nunca autorizaram aparecer no site) é diferente do padrão já usado em `Testimonials.tsx` (prints de feedback que clientes deram voluntariamente sabendo que seriam divulgados). Perguntei ao Seven como proceder — ele confirmou explicitamente **manter os dados reais com telefone parcialmente mascarado**. Se pedir pra replicar esse padrão com outros leads no futuro, repetir essa checagem de consentimento antes de publicar dado real de terceiro, não assumir que a aprovação anterior vale para novos nomes/números.

## Como estender

Pra adicionar mais exemplos, só editar o array `ALERTS` em `WhatsAppAlerts.tsx` — cada item precisa de `nome`, `telefone` (já mascarado no formato `DDIDDD••••XXXX`), `score`, `status`, `msg`, `hora`.
