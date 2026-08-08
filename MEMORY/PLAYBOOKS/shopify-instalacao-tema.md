# Playbook: Instalação de Tema Shopify (padrão obrigatório)

**Regra de ouro:** instalar um tema nunca é só subir o zip. O objetivo é entregar pronto pra produção — o cliente nunca deve perceber que acabou de ser instalado. Nada de placeholder, seção vazia, link quebrado ou 404.

Instrução do Seven (2026-07-13), vale para **todo** pedido de "instalar tema Shopify" a partir de agora.

---

## 0. Prioridade: conseguir acesso à Admin API antes de começar

Sempre que o pedido for "instalar tema" ou "deixar produtos prontos com imagem/vídeo", **pedir o token da Admin API logo no início**, antes de fazer qualquer trabalho manual:

1. Configurações → Apps e canais de vendas → Desenvolvimento de apps
2. Criar um app → escopos: `write_products`, `read_products`, `write_files`/`read_files`, `write_themes`, `read_themes`
3. Instalar → revelar token (`shpat_...`) + domínio da loja (`xxx.myshopify.com`)

**Por quê:** sem token, várias etapas do checklist abaixo (imagem+vídeo no CSV, publicar tema, criar coleções automáticas, checar links ao vivo) viram trabalho manual do cliente. Só pular esse passo se o cliente disser explicitamente que vai subir tudo sozinho.

**Nunca publicar conteúdo do cliente (fotos de produto, catálogo) em host público de terceiros sem confirmação explícita dele antes** — isso é bloqueado pelo classificador de auto mode e corretamente assim.

---

## 1. Configuração completa do tema — o que É possível sem API, direto no código

Nunca entregar tema "cru". Ao editar/criar um tema, garantir que os arquivos já vêm com:

- **Header, Footer, Menus, Navegação** — schema com defaults sensatos, nunca campo obrigatório vazio
- **Cores, Tipografia, Espaçamentos, Botões** — settings_schema.json com defaults reais, não placeholder cinza
- **Banner principal e seções da Home** — ver seção 8 abaixo (imagens embutidas como asset do tema, com fallback)
- **Newsletter, WhatsApp, Redes sociais** — número/handle reais do cliente, nunca `5511999999999` de exemplo
- **Políticas (Envio, Trocas, Sobre)** — texto real do cliente direto no schema da seção, não Lorem Ipsum
- **Favicon, Logo, Meta Tags básicas** — `<title>`, `meta description`, Open Graph no `layout/theme.liquid`

**SEO básico, sitemap.xml, robots.txt, Open Graph de produto, páginas de conta/login/pedidos, checkout** são **gerados automaticamente pela plataforma Shopify** assim que o tema é publicado numa loja real — não são arquivos que a gente escreve. Não perder tempo tentando recriá-los manualmente; só existem/são testáveis depois que o tema está publicado numa loja de verdade (precisa de acesso à loja, ver seção 0).

---

## 2. Migração automática de tema antigo

Antes de criar algo do zero, **sempre comparar com o tema anterior** (exportar via Admin → Temas → tema atual → Exportar, ou pedir pro cliente) e copiar:

Menus, Header, Footer, paleta de cores, fontes, links, coleções, páginas, políticas, seções da Home, identidade visual.

**Erro real que já aconteceu neste fluxo:** um tema publicado estava com `templates/index.json` e `templates/collection.json` **vazios/faltando** (por edição manual quebrada no editor do Shopify) — isso é a causa nº1 de "site caindo em 404". Sempre diffar a lista de arquivos do tema exportado contra uma cópia de referência completa antes de assumir que "só falta configurar".

---

## 3. Imagens de seção sem precisar de Admin API — a solução que funciona

`image_picker` (Hero, Category Tiles, Story, Craft Banner etc.) só aceita arquivo já carregado na biblioteca de Files da loja — não dá pra "grudar" isso num JSON de tema sem token.

**Solução usada e validada:** bundlar fotos reais do cliente dentro de `assets/` do próprio tema (isso SIM sobe junto no zip, sem precisar de API) e no `.liquid` da seção fazer fallback:

```liquid
{%- if section.settings.image -%}
  <img src="{{ section.settings.image | image_url: width: 1800 }}" ...>
{%- else -%}
  <img src="{{ 'default-hero.jpg' | asset_url }}" ...>
{%- endif -%}
```

Assim o tema **já nasce bonito**, sem o cliente precisar escolher imagem manualmente — e se ele quiser trocar depois, o campo `image_picker` continua funcionando normalmente no editor.

---

## 4. Produtos — CSV profissional (limites reais do formato)

O CSV do Shopify cobre: imagens (via URL pública), variantes, tags, preço, compare_at_price, peso, SKU, código de barras, SEO title/description, alt de imagem.

**O que o CSV NÃO cobre, mesmo com URL pública disponível:**
- **Vídeo** — não existe coluna de vídeo no formato de importação. Vídeo sempre precisa ir por upload manual no Admin ou via API (`productCreateMedia`).
- **Metafields customizados** — precisam de API ou app de metafields, não vêm no CSV padrão.
- **Coleções** — CSV de produto não define collection membership; coleção automática por tag precisa ser criada à parte no Admin (2 min, manual) ou via API.

Sempre gerar o CSV com `Image Src` preenchido quando houver token/API disponível (upload real pro CDN da loja primeiro). Sem token, deixar `Image Src` em branco e entregar as fotos organizadas em pasta por handle de produto — mais rápido pro cliente arrastar do que ele achar sozinho.

---

## 5. Verificação de 404 antes de considerar concluído

Proibido publicar tema com 404 real. Checar:

- `templates/index.json` e `templates/collection.json` existem e têm conteúdo (causa mais comum de 404 na Home/coleção)
- Todo link do header/footer/menu aponta pra uma rota que existe (`/pages/sobre`, `/pages/politicas` etc. — confirmar que as Pages existem na loja com esses handles)
- Nenhuma seção referencia um `type` de section que não existe na pasta `sections/`

**Cuidado com falso positivo:** o editor do Shopify tem bug/lag de UI onde trocar de página no seletor do topo não atualiza o preview na hora, e é fácil confundir isso com "o tema tá quebrado". Antes de mexer em código por causa de um print, pedir pra abrir a URL com `?previewPath=%2F` ou usar "Visualizar loja" a partir da lista de Temas — isso ignora estado preso do editor.

---

## 6. Validação de sintaxe (fazer sempre, sem precisar de loja)

Antes de entregar qualquer zip de tema:

```powershell
# JSON de templates/config
Get-Content $arquivo -Raw | ConvertFrom-Json -ErrorAction Stop

# Schema embutido em .liquid
$content -match '(?s){%\s*schema\s*%}(.*?){%\s*endschema\s*%}'
```

E contagem de tags Liquid balanceadas (`{% if %}`/`{% endif %}`, `{% for %}`/`{% endfor %}` etc. — cuidado que `endform` contém a substring `endfor`, dá falso positivo em grep simples).

---

## 7. Empacotamento do zip — cuidado com PowerShell

`Compress-Archive` do Windows PowerShell grava caminhos internos do zip com **barra invertida** (`\`), e o validador do Shopify rejeita isso com erro `missing template "layout/theme.liquid"` mesmo o arquivo existindo. **Sempre** empacotar com `System.IO.Compression.ZipFile` manualmente, forçando `/`:

```powershell
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::Open($out, [System.IO.Compression.ZipArchiveMode]::Create)
foreach ($f in Get-ChildItem -Path $src -Recurse -File) {
    $rel = $f.FullName.Substring($src.Length + 1) -replace '\\', '/'
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $f.FullName, $rel) | Out-Null
}
$zip.Dispose()
```

---

## 8. Entrega final

- Zip do tema pronto pra upload (Admin → Temas → Adicionar tema → Fazer upload do arquivo)
- CSV(s) de produto
- Pasta de fotos/vídeos organizada por handle de produto (nome da pasta = handle do CSV)
- Resumo claro do que é 100% automático vs. o que precisa de 1-2 cliques manuais do cliente (e por quê — platform limitation, não preguiça)

---

## Itens do checklist do cliente que dependem de loja/API ao vivo (não dá pra verificar só com arquivos)

Checkout, contas de cliente, busca funcional, filtros ao vivo, sitemap.xml, robots.txt, thumbnail de preview na lista de temas, teste cross-device real, velocidade de carregamento real. Todos esses só existem/são testáveis depois que o tema está **publicado numa loja real** — sinalizar isso ao cliente em vez de tentar simular localmente.

---

## 9. Shopify CLI — acesso e edição direta numa loja já existente (via OAuth)

Validado ao vivo na loja da Natália Silveira (2026-07-24/25). Use este fluxo sempre que precisar editar/publicar tema, criar Pages/Collections ou corrigir produtos direto numa loja de cliente que já está no ar (diferente da seção 0, que é sobre instalação inicial).

**Comandos-chave** (Shopify CLI ≥4.5, plugin `@shopify/store` já vem embutido):

```bash
shopify store auth --store <loja>.myshopify.com --scopes read_products,write_products,read_content,write_content,read_online_store_pages,write_online_store_pages,read_online_store_navigation,write_online_store_navigation,read_themes,write_themes,read_publications,write_publications
shopify store execute --store <loja>.myshopify.com --query '...'                 # leitura
shopify store execute --store <loja>.myshopify.com --allow-mutations --query '...'  # mutation
shopify theme list --store <loja>.myshopify.com --json                           # acha o ID do tema live
shopify theme push --store <loja>.myshopify.com --theme <id> --allow-live        # publica no tema ATIVO
```

### Gotchas reais que custaram tempo

1. **O domínio que o cliente/você usa não é sempre o `.myshopify.com` real.** A Natália conhecia a loja como `natalia-silveira-2`, mas o domínio permanente é `dvbsep-gk.myshopify.com` (a loja foi renomeada em algum momento e o handle antigo virou só um apelido de exibição). O erro é `OAuth callback store does not match the requested store` — a própria mensagem já devolve o domínio certo (`Shopify returned <dominio-real> during authentication`), é só rodar `store auth` de novo com esse valor.

2. **Porta do callback OAuth (13387) pode ficar presa** de uma tentativa anterior que não fechou limpo, travando todas as tentativas seguintes com "Timed out waiting for OAuth callback" mesmo com o usuário clicando certo. Sintoma: erro muda pra `Port 13387 is already in use` numa tentativa subsequente. Fix: achar o PID (`netstat -ano | grep 13387`) e matar (`taskkill //PID <pid> //F`) antes de tentar de novo.

3. **`shopify store auth` roda em ambiente non-interactive/sandboxed sem abrir navegador visível** — nesse caso não tem workaround por CLI; a alternativa é o próprio cliente/dono rodar o comando no terminal dele (ele vê a janela de login abrir de verdade). Custom App com Admin API token é outra alternativa (ver seção 0), mas exige navegar por várias telas do Admin — só vale a pena se o OAuth interativo estiver indisponível mesmo.

4. **Escopo insuficiente só aparece no erro da query que precisa dele**, não author antes. `read_publications`/`write_publications` (necessário pra checar/corrigir se uma Collection ou Product está publicado num canal de vendas) não faz parte dos escopos "óbvios" de conteúdo/tema — se aparecer `Access denied for publications field`, reautenticar incluindo esses dois escopos.

5. **Causa nº1 de "página/coleção existe mas dá 404 ou aparece vazia": falta de publicação no canal de vendas**, não falta de conteúdo. `Collection`/`Product` têm `resourcePublicationsCount` — se vier `0`, o recurso existe e está `ACTIVE` mas não está visível em nenhum canal. Fix:
   ```graphql
   mutation { publishablePublish(id: "gid://shopify/Collection/<id>", input: [{publicationId: "gid://shopify/Publication/<id-loja-virtual>"}, {publicationId: "gid://shopify/Publication/<id-ponto-de-venda>"}]) { userErrors { field message } } }
   ```
   Pegar os IDs de publicação com `query { publications(first: 10) { edges { node { id name } } } }`. Mesma mutation serve para Product (`gid://shopify/Product/<id>`).

6. **Criar Page via API é raso — o conteúdo real vem do tema, não do campo `body`.** `pageCreate(page: {title, handle, templateSuffix, isPublished: true, body: "placeholder"})` cria a Page com o handle e o `templateSuffix` certos (que ligam a Page ao `templates/page.<suffix>.json` do tema), mas o texto que aparece de fato é o do `settings` da section referenciada nesse template — o `body` da mutation pode ficar como placeholder curto. Isso só funciona depois que o `theme push` sobe os templates/sections correspondentes.

7. **`theme push --allow-live` é bloqueado pelo classificador de auto mode por padrão** (sobrescreve produção) — sempre vai pedir confirmação explícita do dono antes de rodar, mesmo que ele já tenha pedido "publica tudo" em mensagens anteriores na mesma conversa. Correto e esperado; não tentar contornar.

8. **WebFetch para validar o site publicado ignora CSS** — converte HTML→markdown, então um accordion fechado por `max-height:0` aparece "todo visível" no relatório do WebFetch mesmo estando corretamente escondido no navegador real. Antes de reabrir investigação por causa disso, checar o CSS (`.accordion-body { max-height: 0; overflow: hidden }`) em vez de assumir bug.
