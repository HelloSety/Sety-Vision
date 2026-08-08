import { getSupabaseServer } from "@/lib/supabase";

/**
 * Ao chegar mensagem de um número novo, cria lead automaticamente.
 * Se o número já é lead, só registra a mensagem e soma unread.
 */
export async function recordInboundWhatsappMessage(
  phone: string,
  body: string,
  pushName?: string
) {
  const supabase = getSupabaseServer();

  const { data: existing } = await supabase
    .from("leads")
    .select("id, unread")
    .eq("phone", phone)
    .maybeSingle();

  let leadId: string | undefined = existing?.id;

  if (!leadId) {
    const name = pushName || phone;
    const { data: created, error } = await supabase
      .from("leads")
      .insert({
        name,
        phone,
        origin: "whatsapp",
        status: "novo",
        temperature: "cold",
        score: 10,
        avatar: name.slice(0, 1).toUpperCase(),
        unread: 1,
      })
      .select("id")
      .single();
    if (error || !created) throw error ?? new Error("Falha ao criar lead");
    leadId = created.id;
  } else {
    await supabase
      .from("leads")
      .update({ unread: (existing?.unread ?? 0) + 1, updated_at: new Date().toISOString() })
      .eq("id", leadId);
  }

  await supabase.from("messages").insert({
    lead_id: leadId,
    content: body || "[mídia]",
    role: "client",
  });
}
