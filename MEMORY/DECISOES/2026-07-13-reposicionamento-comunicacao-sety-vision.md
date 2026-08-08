# Reposicionamento de comunicação Sety Vision — vender resultado, não tecnologia (2026-07-13)

**Decisão:** Toda a comunicação da Sety Vision (página de vendas, WhatsApp, Reels, carrossel, anúncio, bio) passa a vender "clientes recuperados / vendas que voltaram / faturamento", nunca "IA / chatbot / automação / CRM". Funil oficial: tráfego (orgânico ou pago) → página de vendas → WhatsApp.

**Why:** O nicho-alvo (donos de negócio) não compra tecnologia, compra resultado. Toda peça que não reforçar "o problema não é falta de cliente, é perder o cliente que já chegou" não vai ao ar.

**How to apply:**
- Nunca usar "automatizamos seu WhatsApp" ou termos técnicos como headline/gancho.
- CTA sempre orientado a resultado ("quanto você está perdendo", "ver funcionando"), nunca "compre agora/promoção".
- Estrutura de copy padrão: Gancho → Dor → Explicação → Solução → Prova → CTA.
- Não inventar estatística sem fonte (ex: "80% das vendas...") — usar case/print real da própria Sety Vision.
- Plano de execução completo (copy mapeada por componente real do Next.js, mensagens WA_MSG novas, roteiro de Reels, 7 slides de carrossel, anúncio Meta Ads, bio) gerado em artifact: https://claude.ai/code/artifact/9ec802f5-e840-4d16-8768-36647f8ada3a
- Arquivos a editar no código: `saidas/sety-vision-next/app/components/landing/{Hero,ServicosTeaser,ResultadosTeaser,HowItWorks,CTA}.tsx` e `saidas/sety-vision-next/lib/whatsapp.ts` (objeto `WA_MSG`).
- Venda continua sempre por reunião (não fechar preço no chat) — ver [[project_aurora_maquina_crescimento]].
