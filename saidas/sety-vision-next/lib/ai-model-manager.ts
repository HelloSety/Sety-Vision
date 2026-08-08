import Anthropic from "@anthropic-ai/sdk";

/**
 * Gerenciador central de modelos: Fable 5 é o modelo principal, Opus 4.8 é o
 * fallback automático. Estado vive na memória do processo (válido enquanto a
 * function serverless estiver quente; em cold start volta a tentar o Fable 5
 * primeiro, o que é o comportamento correto).
 */
export type ModelId = "claude-fable-5" | "claude-opus-4-8";

const PRIMARY: ModelId = "claude-fable-5";
const FALLBACK: ModelId = "claude-opus-4-8";
const COOLDOWN_MS = 60_000;
const REQUEST_TIMEOUT_MS = 15_000;
const MAX_SWITCH_LOG = 20;

interface ModelState {
  id: ModelId;
  healthy: boolean;
  lastError: string | null;
  lastErrorAt: number | null;
  lastSuccessAt: number | null;
  avgLatencyMs: number;
  totalCalls: number;
  totalErrors: number;
}

interface SwitchLogEntry {
  at: number;
  to: ModelId;
  reason: string;
}

function initialState(id: ModelId): ModelState {
  return {
    id, healthy: true, lastError: null, lastErrorAt: null,
    lastSuccessAt: null, avgLatencyMs: 0, totalCalls: 0, totalErrors: 0,
  };
}

const state: Record<ModelId, ModelState> = {
  [PRIMARY]: initialState(PRIMARY),
  [FALLBACK]: initialState(FALLBACK),
};

let activeModel: ModelId = PRIMARY;
const switchLog: SwitchLogEntry[] = [];

const client = new Anthropic();

function describeError(err: unknown): string {
  if (err instanceof Anthropic.APIError) {
    if (err.status === 429) return "limite de requisições (429)";
    if (err.status && err.status >= 500) return `erro do servidor (${err.status})`;
    return `erro da API (${err.status ?? "?"})`;
  }
  if (err instanceof Error && err.name === "AbortError") return "timeout";
  if (err instanceof Error) return err.message;
  return "erro desconhecido";
}

function markHealthy(id: ModelId, latencyMs: number) {
  const s = state[id];
  s.healthy = true;
  s.lastError = null;
  s.lastErrorAt = null;
  s.lastSuccessAt = Date.now();
  s.totalCalls++;
  s.avgLatencyMs = s.avgLatencyMs === 0 ? latencyMs : Math.round(s.avgLatencyMs * 0.7 + latencyMs * 0.3);
}

function markUnhealthy(id: ModelId, reason: string) {
  const s = state[id];
  s.healthy = false;
  s.lastError = reason;
  s.lastErrorAt = Date.now();
  s.totalCalls++;
  s.totalErrors++;
}

function recordSwitch(to: ModelId, reason: string) {
  if (activeModel === to) return;
  activeModel = to;
  switchLog.unshift({ at: Date.now(), to, reason });
  if (switchLog.length > MAX_SWITCH_LOG) switchLog.pop();
  console.warn(`[ai-model-manager] ativo agora: ${to} (${reason})`);
}

type ChatMessage = { role: "user" | "assistant"; content: string };

async function callModel(modelId: ModelId, opts: { system: string; messages: ChatMessage[]; maxTokens: number }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const start = Date.now();
  try {
    const response = await client.messages.create(
      { model: modelId, max_tokens: opts.maxTokens, system: opts.system, messages: opts.messages },
      { signal: controller.signal }
    );
    const text = response.content[0]?.type === "text" ? response.content[0].text.trim() : "";
    if (!text) throw new Error("resposta vazia");
    markHealthy(modelId, Date.now() - start);
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Chama o modelo principal (Fable 5); em qualquer falha retryable
 * (429, 5xx, timeout, resposta vazia, erro de conexão) cai pro Opus 4.8
 * na mesma requisição, sem o chamador precisar saber disso.
 * Se o Fable 5 estava marcado como indisponível, tenta reassumir
 * automaticamente depois do cooldown — sem intervenção manual.
 */
export async function completeWithFailover(opts: {
  system: string;
  messages: ChatMessage[];
  maxTokens: number;
}): Promise<{ text: string; modelUsed: ModelId }> {
  const primaryState = state[PRIMARY];
  const cooldownElapsed = !primaryState.lastErrorAt || Date.now() - primaryState.lastErrorAt > COOLDOWN_MS;
  const tryPrimaryFirst = primaryState.healthy || cooldownElapsed;
  const order: ModelId[] = tryPrimaryFirst ? [PRIMARY, FALLBACK] : [FALLBACK, PRIMARY];

  let lastErr: unknown;
  for (let i = 0; i < order.length; i++) {
    const modelId = order[i];
    try {
      const text = await callModel(modelId, opts);
      recordSwitch(modelId, i === 0 ? "modelo saudável" : "fallback automático");
      return { text, modelUsed: modelId };
    } catch (err) {
      markUnhealthy(modelId, describeError(err));
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Falha em todos os modelos configurados");
}

export function getModelManagerStatus() {
  return {
    activeModel,
    primary: PRIMARY,
    fallback: FALLBACK,
    models: [state[PRIMARY], state[FALLBACK]],
    recentSwitches: switchLog,
  };
}
