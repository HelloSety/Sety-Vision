---
name: tiktok_shop_checklist_alemanha
description: Caminho documental completo pra abrir loja no TikTok Shop Alemanha e receber pagamentos em EUR, sendo brasileiro sem CNPJ/residência na Alemanha
metadata:
  type: project
---

# TikTok Shop Alemanha — Documentação e Recebimento em EUR

O que é: caminho documental fechado, do zero até receber o primeiro pagamento em EUR. Por que existe: TikTok Shop Alemanha já está no ar (lançou 31/03/2025) — o que trava não é a plataforma, é a estrutura legal por trás.

Relacionado: [[project_die_landfrau]] · [[project_tiktok_shop_internacional]]

## ⚠️ O que eu não resolvo por você

Abrir empresa, assinar procuração, ir a notário e abrir conta bancária são atos que exigem sua assinatura/identidade real — nenhuma automação nem IA substitui isso. O que fiz aqui foi fechar o **caminho exato**, sem ambiguidade, pra você (ou quem contratar) executar sem pesquisar do zero.

## Por que Einzelunternehmen (autônomo) está fora

Registro como autônomo alemão exige a própria pessoa se cadastrar no Gewerbeamt local, e pra não-europeu isso normalmente exige visto de trabalho autônomo — ou seja, residência na Alemanha. **Fechado pra quem opera do Brasil.**

## Caminho viável: UG (haftungsbeschränkt)

UG é a versão alemã de sociedade limitada com capital mínimo baixo (a partir de €1, mas retém parte do lucro até acumular €25.000 e virar GmbH automaticamente). **Sócio e diretor (Geschäftsführer) podem ser não-residentes** — não é obrigatório morar na Alemanha. O que é obrigatório:

- Endereço comercial alemão verificável (virtual office com "usage agreement" — não vale caixa postal simples)
- Constituição via notário — desde 2022 dá pra fazer por **videoconferência** (plataforma da Bundesnotarkammer) pra sócio único, sem precisar viajar
- Registro no Handelsregister

## Passo a passo completo

| # | Etapa | Como fazer | Prazo/custo aprox. |
|---|---|---|---|
| 1 | Constituir a UG | Contratar formation agent que atende estrangeiros — ver opções abaixo | 2-4 semanas · €1.000-1.500 total (notário + endereço comercial incluído) |
| 2 | Receber Handelsregisterauszug | Documento de registro sai automaticamente após a constituição | incluso no processo acima |
| 3 | Abrir conta EUR | **Wise Business** — aceita empresa com sócio/diretor estrangeiro, emite IBAN europeu em nome da UG. Fazer só depois de ter o Handelsregisterauszug em mãos | poucos dias após ter o documento |
| 4 | Registrar VAT (USt-IdNr) | No Finanzamt (Receita local) ou BZSt — necessário pro cadastro completo no TikTok Shop | paralelo ao passo 3 |
| 5 | Impressum + política de privacidade DSGVO + devolução 14 dias | Documentos padrão de e-commerce alemão, gerar uma vez e reusar | — |
| 6 | Cadastro em seller.tiktok.com | Escolher "Unternehmen", subir Handelsregisterauszug + USt-IdNr + IBAN da Wise Business | dias, quando doc está completo |
| 7 | Rótulo de conteúdo IA na bio + vídeos | Exigência do AI Act Art. 50 — texto pronto em `personagem/persona.md` | — |

### ⚠️ Não confundir conta de recebimento

- **Wise Business** funciona (IBAN europeu em nome da empresa, aceita diretor estrangeiro) ✅
- **N26 Business** não serve — atende só autônomo/freelancer com residência alemã, não aceita UG/GmbH de estrangeiro ❌
- **Payoneer** hoje só liquida TikTok Shop em USD/GBP, não em EUR — não resolve a Alemanha ❌
- TikTok exige a conta em **nome da entidade registrada**, não conta pessoal sua

## Serviços de formação remota (não exige ida à Alemanha)

| Serviço | O que faz |
|---|---|
| **Firma.de** | UG/GmbH completo, atende founders internacionais, notário em inglês, procuração pra sócio estrangeiro — melhor ponto de partida |
| **Company Formation Germany** | Pacote turnkey pra não-residentes, a partir de ~€1.250 |
| **WW+KN** / **Consulting House** | Especializados em nomear Geschäftsführer pra empresas de fora — útil se quiser um diretor local além de você |

## Rota alternativa (mais rápida, menos controle)

Fornecer produto/fulfillment pra um parceiro que já tem loja aberta no TikTok Shop Alemanha, via contrato de fornecimento comercial. **Não é trilha oficial da plataforma** — é acordo privado, e todo o risco de compliance/conta fica no nome do parceiro, não no seu. Útil só pra validar formato/produto rápido, não como estrutura definitiva.

## Impostos recorrentes depois de aberta a UG

- Körperschaftsteuer (IR pessoa jurídica): 15%
- Solidaritätszuschlag: 5,5% sobre o imposto acima
- Gewerbesteuer (municipal): ~14-17%, varia por cidade
- **Carga efetiva total: ~30-33% sobre o lucro**
- Kleinunternehmerregelung (isenção de repasse de VAT) vale até €25.000/ano anterior + €100.000/ano corrente — ajuda só nos primeiros meses, TikTok Shop provavelmente exige USt-IdNr completo de qualquer forma

**Recomendação:** validar os pontos fiscais finais com um Steuerberater (contador alemão) antes de constituir — regra de VAT cross-border e exigência exata do TikTok mudam com frequência.

## Sequência recomendada (a mais rápida e realista)

1. Contratar Firma.de (ou similar) pra constituir a UG — 2-4 semanas
2. Assim que sair o Handelsregisterauszug, abrir Wise Business
3. Registrar USt-IdNr no Finanzamt/BZSt
4. Cadastrar no TikTok Shop Seller Center com os 3 documentos acima
5. Só então ligar a automação de venda (`prompts/04-copywriter-vendas.md` + `prompts/05-produto-winner-finder.md`)

## Taxas da plataforma

**9% de comissão** sobre vendas (7% em eletrônicos) — vigente desde 08/01/2026.

## Fontes

Pesquisa de mercado 2026-07-31 — principais: firma.de, companyformationgermany.com, se-legal.de, wwkn.de, gmbh-ug.com, ecommercegermany.com, staxxer.com, taxfix.de, steuernaut.de, payoneer.custhelp.com, nomadgate.com, TikTok Newsroom.
