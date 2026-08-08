import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseServer();
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [{ data: recentMsgs }, { count: hotLeads }, { data: feedMsgs }] = await Promise.all([
    supabase.from("messages").select("lead_id").gte("timestamp", since24h),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("temperature", "hot"),
    supabase
      .from("messages")
      .select("id, content, role, timestamp, lead_id, leads(name)")
      .order("timestamp", { ascending: false })
      .limit(9),
  ]);

  const activeConversations = new Set((recentMsgs ?? []).map((m) => m.lead_id)).size;

  const feed = (feedMsgs ?? []).map((m) => {
    const leadRel = m.leads as unknown as { name: string } | { name: string }[] | null;
    const leadName = Array.isArray(leadRel) ? leadRel[0]?.name : leadRel?.name;
    return {
      id: m.id,
      text:
        m.role === "client"
          ? `${leadName || "Contato"} enviou: "${m.content.slice(0, 60)}"`
          : `IA respondeu ${leadName || "contato"}`,
      timestamp: m.timestamp,
    };
  });

  return NextResponse.json({
    stats: { activeConversations, hotLeads: hotLeads ?? 0 },
    feed,
  });
}
