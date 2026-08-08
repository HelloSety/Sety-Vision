---
name: cliente-natalia-silveira
description: Cliente ativa — loja Shopify de macramê de luxo, site nataliasilveira.com.br, correções contínuas via WhatsApp
metadata:
  type: project
---

# Natália Silveira

Marca de moda artesanal (macramê de luxo, "handmade luxury"), fundada pela estilista Natália Silveira. Loja Shopify em produção.

## O que é

- **Loja Shopify**: domínio real `dvbsep-gk.myshopify.com` (o nome `natalia-silveira-2` é só um apelido antigo de exibição, não o domínio real — ver [[feedback_shopify_instalacao_tema]] seção 9 antes de tentar autenticar CLI)
- **Site publicado**: https://nataliasilveira.com.br
- **Tema ativo**: `natalia-silveira-theme-corrigido` (ID `187323384097`)
- **Código-fonte do tema**: `clientes/natalia-silveira/shopify/theme/` neste repo
- Produto: peças de macramê sob medida (vestidos, conjuntos, peças exclusivas) + linha "Complementos do Look" (shortinho/saia/hotpants forro, R$149, para usar por baixo das peças)

## Por que existe

Cliente recorrente da Sety Studio para manutenção contínua do site/loja — fluxo de trabalho é a Natália mandar prints/vídeos do WhatsApp com correções pontuais (texto, imagem, estrutura), repassados pelo Seven em lote.

## Relacionado

- [[feedback_shopify_instalacao_tema]] — playbook técnico Shopify (seção 9: acesso via CLI a loja existente)
- Site antigo Vercel (pré-migração) tinha link quebrado — não usar, já migrado 100% pra Shopify

## Estado em 2026-07-25

Rodada grande de correções aplicada e publicada ao vivo:
- Textos: hero ("Criamos sonhos. Vestimos momentos."), craft-banner ("Exclusividade, feita à mão."), grade de produtos ("SELEÇÃO" / "ÍCONES DA COLEÇÃO")
- Accordion "Sobre" dividido em "Sobre a Marca" + "Sobre a Fundadora" (textos diferentes, cada um oculto até clicar)
- 5 Pages novas criadas no Admin (Sobre, Tempo de Produção, Trocas e Devoluções, Política de Privacidade, Tabela de Cores) — todas com handle e `templateSuffix` corretos
- Causa raiz de vários 404: Collection "Complementos do Look" e os 3 produtos dela existiam mas tinham `resourcePublicationsCount: 0` (nunca publicados em canal de vendas) — corrigido via `publishablePublish`
- Hero agora aceita imagem separada para mobile (`mobile_image`) — campo existe no editor, mas a Natália ainda não subiu a foto
- Paleta de cores mantida como está (17 cores lisas, sem lurex) — decisão do Seven, não trocar sem confirmação nova

## Próximos passos

- Natália precisa trocar as fotos principais de vários produtos (hoje aparece manequim, ela quer modelo vestindo) — ela já indicou quais fotos usar em mensagens anteriores do WhatsApp que não foram repassadas ainda
- Subir a imagem mobile do hero (campo já existe no tema)
- Se pedir texto de Política de Privacidade autoral (hoje é texto padrão LGPD genérico escrito pela IA), avisar que é genérico
