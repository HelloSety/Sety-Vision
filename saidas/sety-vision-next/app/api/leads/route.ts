import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.name?.trim()) {
    return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: body.name,
      phone: body.phone?.trim() || `manual-${Date.now()}`,
      email: body.email || null,
      origin: body.origin || "manual",
      status: body.status || "novo",
      temperature: "cold",
      score: 40,
      tags: body.tags ?? [],
      avatar: body.name.slice(0, 1).toUpperCase(),
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead: data });
}
