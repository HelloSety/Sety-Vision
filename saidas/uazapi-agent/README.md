# uazapi-agent

Agente de IA no WhatsApp: recebe mensagens via webhook da UAZAPI, agrupa mensagens
próximas num único turno (debounce) e responde usando o Gemini 2.5 Flash, dividindo
a resposta em várias mensagens com indicador de "digitando" entre elas.

## Instalação

```bash
pip install -r requirements.txt
```

## Configuração

```bash
cp .env.example .env
```

Preencha o `.env`:
- `UAZAPI_BASE_URL` e `UAZAPI_INSTANCE_TOKEN` — pegue no painel da sua instância UAZAPI
- `GEMINI_API_KEY` — grátis em https://aistudio.google.com/apikey
- Os demais campos já vêm com valores padrão razoáveis

## Rodar

```bash
python app.py
```

## Expor publicamente

A UAZAPI precisa alcançar sua máquina pela internet. Em desenvolvimento, use o ngrok:

```bash
ngrok http 5000
```

Copie a URL `https://SEU-NGROK.ngrok.io` gerada.

## Configurar o webhook na UAZAPI

Consulte `llms-uazapi.txt`, seção "ENDPOINTS — WEBHOOK", para detalhes completos.
Com a URL do ngrok em mãos, rode:

```bash
curl -X PUT "https://seudominio.uazapi.com/webhook" \
  -H "token: SEU_INSTANCE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://SEU-NGROK.ngrok.io/webhook",
    "events": ["message"]
  }'
```

Pronto — mensagens recebidas no número conectado à instância já chegam no `/webhook`
e o agente responde sozinho.

## Adicionando tools no futuro

O parâmetro `tools` já existe em `llm.py` (`generate_reply(history, system, tools=None)`),
só não está sendo usado ainda. Pra ligar function calling do Gemini:

1. Monte a lista de ferramentas: `tools=[types.Tool(function_declarations=[...])]`
2. Passe esse `tools` na chamada de `generate_reply`
3. Depois de `_client.models.generate_content(...)`, percorra
   `response.candidates[0].content.parts` procurando por `part.function_call` —
   quando encontrar, execute a função correspondente e devolva o resultado ao modelo
   numa nova chamada antes de extrair o texto final.

## Expandindo features

Consulte `llms-uazapi.txt` para os payloads e endpoints completos:
- Receber mídia enviada pelo usuário → `/send/download-media`
- Enviar imagem/áudio → `/send/image`, `/send/audio`
- Botões, listas e enquetes interativas → `/send/menu`
- Grupos → seção "ENDPOINTS — GRUPOS"
- Disparo em massa com delay anti-ban → seção "ENDPOINTS — CAMPANHAS EM MASSA"
