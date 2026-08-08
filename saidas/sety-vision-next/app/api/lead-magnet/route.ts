import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";
import { sendText, isConfigured, normalizeNumber } from "@/lib/uazapi";
import { getLeadMagnet } from "@/lib/lead-magnets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = body?.name?.trim();
  const phoneRaw = body?.phone?.trim();
  const slug = body?.slug?.trim();

  if (!name) return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
  if (!phoneRaw) return NextResponse.json({ error: "WhatsApp obrigatório" }, { status: 400 });

  const magnet = getLeadMagnet(slug);
  if (!magnet) return NextResponse.json({ error: "Material não encontrado" }, { status: 404 });

  const phone = normalizeNumber(phoneRaw);

  const supabase = getSupabaseServer();
  const { data: lead, error } = await supabase
    .from("leads")
    .insert({
      name,
      phone,
      origin: `linkedin-leadmagnet:${slug}`,
      status: "novo",
      temperature: "warm",
      score: 55,
      tags: ["linkedin", `material-${slug}`],
      avatar: name.slice(0, 1).toUpperCase(),
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let whatsappEnviado = false;
  if (isConfigured()) {
    try {
      await sendText(phone, magnet.whatsappMensagem(name.split(" ")[0]));
      whatsappEnviado = true;
    } catch (err) {
      console.error("Falha ao enviar WhatsApp de entrega:", err);
    }
  }

  return NextResponse.json({ lead, whatsappEnviado });
}
