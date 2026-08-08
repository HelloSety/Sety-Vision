import { VOICE_SYSTEM_PROMPT } from "@/lib/voice-prompt";
import { completeWithFailover } from "@/lib/ai-model-manager";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Message = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  try {
    const { message, history = [] }: { message: string; history: Message[] } = await req.json();

    if (!message?.trim()) {
      return Response.json({ error: "Mensagem vazia" }, { status: 400 });
    }

    const messages: Message[] = [
      ...history.slice(-8),  // Keep last 8 turns for context
      { role: "user", content: message },
    ];

    const { text, modelUsed } = await completeWithFailover({
      system: VOICE_SYSTEM_PROMPT,
      messages,
      maxTokens: 200, // Short responses for voice
    });

    return Response.json({ reply: text, modelUsed });
  } catch (err) {
    console.error("[voice] error:", err);
    return Response.json(
      { error: "Erro ao processar sua mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}
