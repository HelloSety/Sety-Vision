---
name: vellarie-acesso
description: Acesso rápido do cliente Vellarie — loja Shopify de bem-estar / autocuidado (massageadores, terapia de luz vermelha, ferramentas de beleza), domínio vellarie.store, conectada via Shopify CLI
metadata:
  type: project
---

# Vellarie — Acesso rápido

Cliente: **Vellarie**
Nicho: bem-estar / autocuidado / beleza — massageadores, terapia de luz vermelha (red light therapy), alívio de dor, cuidado capilar, ferramentas de beleza e barbearia.
Modelo: e-commerce Shopify (dropshipping — catálogo importado de fornecedor).

## Loja Shopify

- **Admin:** https://admin.shopify.com/store/4zevyg-1g
- **myshopify:** `4zevyg-1g.myshopify.com`
- **Domínio primário (já ligado):** https://www.vellarie.store
- **Store ID:** `gid://shopify/Shop/74824286339`
- **Dono / e-mail da conta:** Jônatas Dias — jonatasdiana2002@gmail.com
- **Plano:** Basic
- **Moeda:** BRL · **Fuso:** America/Sao_Paulo · **País:** BR (Serra/ES)
- **Impostos incluídos no preço:** sim (padrão BR)
- **Senha da loja:** desativada — a loja está pública / no ar.

## Conexão via CLI (Shopify CLI 4.7.1)

Autenticado em 2026-09-02 via:

```bash
shopify store auth --store 4zevyg-1g.myshopify.com --scopes "write_products,write_themes,write_content,write_publications,write_inventory,read_locations,write_markets,write_shipping,write_files,write_discounts,write_price_rules,write_translations,write_metaobjects,write_online_store_navigation"
```

Token online salvo pelo CLI (`shopify store auth list` pra conferir). Rodar de novo se expirar ou faltar escopo.

**Escopos que ainda faltam** (re-autenticar adicionando quando for mexer nisso):
- `read_legal_policies,write_legal_policies` — editar as 4 políticas da loja
- `read_locales,write_locales` — ver/editar idiomas e traduções

Executar query/mutation:

```bash
shopify store execute --store 4zevyg-1g.myshopify.com --query 'query { shop { name } }'
# mutation: acrescentar --allow-mutations
```

## Estado da loja em 2026-09-02 (diagnóstico inicial)

| Item | Estado |
|---|---|
| Produtos | **18**, todos `ACTIVE`, **títulos e descrições 100% em inglês**, vendor "Minha loja", sem SKU, sem `productType`, sem `compareAtPrice` (sem ancoragem de preço). Imagens hospedadas em CDN de fornecedor (`static.hzpdex.com`, `res.race321.com`). Descrições com `<img>` e tabelas de specs cruas coladas do fornecedor. |
| Coleções | **4 genéricas** de kit de setup: "Página inicial" (1 produto), "Best Sellers", "Best Offers", "Free Shipping" — as 3 últimas são automáticas por tag e contêm os mesmos 18 produtos. Nenhuma coleção real por categoria. |
| Tema | MAIN publicado: **"E-com Express"** (genérico). "Horizon" instalado como rascunho (não publicado). |
| Páginas | 5: "Contato" + 4 políticas com **título em inglês** (Privacy Policy, Terms of Service, Return and Refund Policy, Shipping Policy). |
| Menus | 3 padrão: Menu principal, Menu do rodapé, Menu da conta do cliente. |
| Canais | Loja virtual + Ponto de venda. |
| Frete | 1 perfil ("Perfil geral", default) — não auditado ainda (falta escopo `read_legal_policies` não; frete é `read_shipping`, ok — auditar zonas/faixas). |
| Mercados | 1: "Brasil" (primário, ativo). |
| Locais | 1: "Local da loja" (ativo). |
| Branding | Logo/cores/fontes da marca: **não confirmados** — pendente Seven enviar identidade da Vellarie. |

### Lista dos 18 produtos (títulos originais em inglês)

1. 3-in-1 Electric Razor for Men with Trimmer and Shaver
2. X20 Wireless Nail Lamp with Rechargeable Lithium Battery
3. Soft Rubber Shampoo Brush for Kids' Scalp Massage
4. Professional 9mm Curling Iron with LCD Display
5. Eyebrow Scissors with Comb for Beginners and Makeup
6. Dual-Purpose Electric Hair Comb for Curling & Straightening
7. Infinity Sweat Belt for Workout and Training (One Piece)
8. 8pcs Ultra-fine Beauty Salon Acne Needle Tool Set
9. 7-in-1 High-Speed Hot Air Brush for Styling
10. Air Pressure Leg Massager Device
11. Roller massager 5 pcs vacuum cupping device
12. Portable Electric Cupping Massager with Red Light (2 Cups)
13. Hair Oiling Red Light Scalp Massager (One Set)
14. RespiRelief™ Red Light Nasal Therapy Device (One Piece)
15. Red Light Therapy Device for Shoulder and Back Pain
16. Infrared Knee Pain Relief Massager with Red Light Therapy
17. LED Scalp Massager with Red Light Therapy
18. SKG4098 Red Premium Neck Massager with Remote

## Pendências antes de considerar a loja "configurada"

1. **Identidade da marca** — Seven enviar logo, cores, fontes da Vellarie (ou aprovar versão provisória).
2. **Localização PT-BR** — traduzir os 18 produtos (nome comercial + descrição limpa), títulos das páginas de política, itens de menu.
3. **Preço** — definir estratégia: manter os preços atuais ou aplicar markup + `compareAtPrice` de ancoragem + arredondar (.90 / .99).
4. **Coleções reais** por categoria (ex.: Alívio de dor · Terapia de luz vermelha · Cuidado capilar · Beleza & Barbearia) substituindo as genéricas.
5. **Navegação** — menu principal e rodapé com as coleções reais + páginas.
6. **Políticas PT-BR** — reescrever as 4 com dados reais (prazo de entrega dropship, trocas, dados da empresa). Precisa do escopo `write_legal_policies`.
7. **Frete** — auditar e configurar o "Perfil geral" (zonas Brasil, faixas, frete grátis acima de X).
8. **Tema/branding** — aplicar cores/logo/favicon/banners/textos no tema publicado (ou decidir trocar de tema).
9. **SEO** — title/meta da loja e das coleções.

## Deploy do tema (pendente — precisa de 1 ação do Jônatas)

O `shopify store auth` que rodei dá acesso só à **Admin API** (`shopify store execute`), **não** a `shopify theme push`.

**Opção A (CLI):** Jônatas instala o app grátis **Theme Access** (by Shopify) no admin → cria uma senha (`shptka_…`) → me passa. Aí:
```bash
cd clientes/vellarie/theme
shopify theme push --store 4zevyg-1g.myshopify.com --password <SHPTKA_TOKEN> --unpublished
```
Sobe como tema **não publicado** — nada muda na loja ao vivo. Preview no admin → publicar quando aprovado.

**Opção B (zip):** já existe pronto — `clientes/vellarie/vellarie-theme-signature-v1.zip` (conteúdo de `theme/`, separadores `/`, 95 arquivos). Subir em *Loja virtual → Temas → Adicionar tema → Fazer upload de arquivo zip*. Entra como **não publicado** → revisar no preview → publicar.

> **2026-09-05 — tema V6 DEPLOYADO (não publicado).** Evoluído V2→V6 (dark premium beauty-tech; auditoria funcional sem link/botão falso). `shopify theme push` funcionou via token Admin (`write_themes`).
> - **Tema:** "VELLARIE — SIGNATURE V6" · id `163248799875` · role UNPUBLISHED · 0 erros (theme check + validação Shopify).
> - **Preview** (logado no admin): `https://4zevyg-1g.myshopify.com?preview_theme_id=163248799875`
> - **Editor:** `https://4zevyg-1g.myshopify.com/admin/themes/163248799875/editor`
> - **Publicar:** `shopify theme push --store 4zevyg-1g.myshopify.com --path clientes/vellarie/theme --theme 163248799875` (atualiza) e publicar no editor quando aprovado. **Nunca** publicar sem revisar o preview.
> - Apagar no admin os temas órfãos #163248636035 e #163248701571 (mesmo nome, de pushes que falharam antes).
> - `theme dev` / `theme list` seguem bloqueados (conta CLI não é staff) — sem impacto no push.
>
> **Falta configurar no admin (Jônatas/Seven, não é do tema):** mercado/moeda **USD** (Settings → Markets — loja está BRL/Brasil); menu principal + footer menu; página **About** (handle `about`, template `page.about`); coleções reais por categoria (Grooming/Hair & Styling/Skin & Body/Recovery); filtros Search & Discovery; `compare_at_price` nos produtos em oferta; app de reviews; políticas EN + frete; **fotos de produto profissionais** (as 18 atuais são composições de fornecedor).

## Histórico

**2026-09-02 — Cliente criado + CLI conectado + tema construído.**
- Seven: "faça o meu cliente novo VELLARIE, conecta via CLI para configurar toda a loja". Autenticado Shopify CLI em `4zevyg-1g.myshopify.com` (Jônatas fez o consent no navegador). Diagnóstico completo da loja (acima) — dropshipping meio-montada, catálogo em inglês, setup genérico.
- Seven mandou a identidade (brand board "Timeless Elegance" — moda feminina, Cinzel + dourado) e depois pivotou pra direção **streetwear/fashion editorial** via spec longa + mockup **"AVANT"** (dark, monocromático, grotesca pesada) + refs theirnibs.com / awwwards fashion.
- Construído um **tema Shopify OS 2.0 do zero** em `clientes/vellarie/theme/` (75 arquivos, passa `theme check` com 0 erros). Data-driven, editável no Theme Editor, 2 presets (AVANT dark / Timeless Elegance gold). Detalhes em `MEMORY/CLIENTES/vellarie.md` e `theme/README.md`.
- **Pendente:** deploy (Theme Access token), assets de logo, catálogo de moda real, coleções, filtros, políticas, frete, pagamento.

**2026-09-04 — Tentativa de deploy do Horizon oficial, mesmo bloqueio.**
- Seven pediu pra clonar e subir o tema Horizon oficial (`github.com/Shopify/horizon`) na loja como rascunho (também cotejou Dawn, Skeleton-theme e um fork de Dawn — escolheu Horizon).
- Clonado com sucesso. `shopify theme push --unpublished` falhou: mesma causa da entrada acima — a conta logada não é staff da loja, e não há Theme Access token ainda. Confirmado: `store execute` (Admin API) e `theme push` usam auth diferentes; um não destrava o outro.
- Seven optou por pedir o token ao Jônatas (Opção A). Assim que chegar, rodar o comando da seção "Deploy do tema" acima — só trocar `clientes/vellarie/theme` pelo checkout do Horizon se for essa a base escolhida, ou usar o tema custom já pronto.
